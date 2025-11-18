import pandas as pd
import numpy as np
from sklearn.cluster import KMeans, MiniBatchKMeans
from sklearn.mixture import GaussianMixture
from scipy.spatial.distance import cdist
from sklearn.decomposition import PCA
import time

class WarehouseAllocator:
    """
    Asigna ubicaciones óptimas de warehouse usando clustering geográfico.
    Añade:
    - Selección automática de clusters para KMeans y MiniBatch usando GAP + Inertia (rápido)
    - Selección automática para GMM mediante BIC + PCA + Early Stopping
    - Logs de resultados
    """

    def __init__(self, df_orders, df_customers, df_geolocation, df_items, df_products, n_clusters=None):
        self.df_orders = df_orders
        self.df_customers = df_customers
        self.df_geolocation = df_geolocation
        self.df_items = df_items
        self.df_products = df_products
        self.n_clusters = n_clusters
        self.logs = []
        self.pca_gmm = None   # <- necesario para predict posterior

    # ------------------------------------------------------------
    # GAP STATISTIC (OPTIMIZADO CON MUESTREO)
    # ------------------------------------------------------------
    def _gap_statistic(self, coords, k, n_refs=5, sample_size=5000):
        """
        Calcula el Gap Statistic para un k dado.
        Mucho más rápido que Silhouette.
        """

        # Sample de velocidad
        if len(coords) > sample_size:
            idx = np.random.choice(len(coords), sample_size, replace=False)
            data = coords[idx]
        else:
            data = coords

        # Inertia real usando sample para acelerar
        km = KMeans(n_clusters=k, random_state=42)
        km.fit(data)
        inertia_real = km.inertia_

        # Inertias aleatorias
        ref_inertias = []
        bounds = np.column_stack((data.min(axis=0), data.max(axis=0)))

        for _ in range(n_refs):
            random_data = np.random.uniform(bounds[:, 0], bounds[:, 1], size=data.shape)
            km_ref = KMeans(n_clusters=k, random_state=42)
            km_ref.fit(random_data)
            ref_inertias.append(km_ref.inertia_)

        gap = np.log(np.mean(ref_inertias)) - np.log(inertia_real)
        return gap

    # ------------------------------------------------------------
    # KMEANS CLÁSICO (GAP + INERTIA)
    # ------------------------------------------------------------
    def _select_best_kmeans(self, coords, k_min=10, k_max=70):
        print(f"[KMEANS] Buscando k óptimo (GAP + Inertia) entre {k_min} y {k_max}...")

        best_gap = -999
        best_model = None
        best_k = None

        for k in range(k_min, k_max + 1):
            try:
                model = KMeans(n_clusters=k, random_state=42)
                model.fit(coords)

                inertia = model.inertia_
                gap = self._gap_statistic(coords, k)

                print(f"[KMEANS] k={k}, inertia={inertia:.2f}, gap={gap:.4f}")

                if gap > best_gap:
                    best_gap = gap
                    best_model = model
                    best_k = k

            except Exception as e:
                print(f"[KMEANS] Error en k={k}: {e}")
                continue

        print(f"[KMEANS] Mejor k encontrado: {best_k}")
        return best_model, best_k

    # ------------------------------------------------------------
    # MINIBATCH KMEANS (GAP + INERTIA)
    # ------------------------------------------------------------
    def _select_best_minibatch(self, coords, k_min=10, k_max=70):
        print(f"[MINIBATCH] Buscando k óptimo (GAP + Inertia) entre {k_min} y {k_max}...")

        best_gap = -999
        best_model = None
        best_k = None

        for k in range(k_min, k_max + 1):
            try:
                batch = min(2048, len(coords))
                model = MiniBatchKMeans(
                    n_clusters=k,
                    random_state=42,
                    batch_size=batch
                )
                model.fit(coords)

                inertia = model.inertia_
                gap = self._gap_statistic(coords, k)

                print(f"[MINIBATCH] k={k}, inertia={inertia:.2f}, gap={gap:.4f}")

                if gap > best_gap:
                    best_gap = gap
                    best_model = model
                    best_k = k

            except Exception as e:
                print(f"[MINIBATCH] Error en k={k}: {e}")
                continue

        print(f"[MINIBATCH] Mejor k encontrado: {best_k}")
        return best_model, best_k

    # ------------------------------------------------------------
    # GMM CON BIC + PCA + EARLY STOPPING
    # ------------------------------------------------------------
    def _select_best_gmm(self, coords, k_min=25, k_max=65, max_iter=200, n_pca_sample=15000):
        """
        GMM optimizado:
        - PCA fit sobre una muestra para acelerar
        - prueba k en [k_min, k_max]
        - covariance_type='diag', init_params='kmeans'
        - max_iter controlado, timing por k, early stopping (patience=3)
        - Retorna el best_gmm entrenado y guarda self.pca_gmm para predict()
        """

        # ---- PCA (fit sobre sample para velocidad) ----
        if len(coords) > n_pca_sample:
            idx = np.random.choice(len(coords), n_pca_sample, replace=False)
            pca_sample = coords[idx]
        else:
            pca_sample = coords

        print(f"[GMM] PCA sample size = {len(pca_sample)}; ajustando PCA...")
        pca = PCA(n_components=2, random_state=42)
        pca.fit(pca_sample)
        coords_reduced = pca.transform(coords)
        self.pca_gmm = pca
        print("[GMM] PCA terminado. dimensión reducida:", coords_reduced.shape)

        # ---- Ajustar rango seguro ----
        if k_min < 2:
            k_min = 2
        if k_max < k_min:
            k_max = k_min

        print(f"[GMM] Buscando k óptimo entre {k_min} y {k_max} (BIC)")

        lowest_bic = np.inf
        best_gmm = None
        worsen_count = 0
        patience = 5

        total_start = time.time()
        for k in range(k_min, k_max + 1):
            start_k = time.time()
            try:
                gmm = GaussianMixture(
                    n_components=k,
                    covariance_type="diag",
                    init_params="kmeans",
                    random_state=42,
                    max_iter=max_iter,
                    verbose=0
                )

                gmm.fit(coords_reduced)
                bic = gmm.bic(coords_reduced)
                elapsed = time.time() - start_k

                print(f"[GMM] k={k}, BIC={bic:.2f}, time={elapsed:.1f}s")

                # selección por BIC (más bajo mejor)
                if bic < lowest_bic:
                    lowest_bic = bic
                    best_gmm = gmm
                    worsen_count = 0
                else:
                    worsen_count += 1

                # early stopping
                if worsen_count >= patience:
                    print(f"[GMM] Early stopping activado en k={k} (worsen_count={worsen_count})")
                    break

            except Exception as e:
                elapsed = time.time() - start_k
                print(f"[GMM] Error en k={k} (time={elapsed:.1f}s): {e}")
                continue

        total_elapsed = time.time() - total_start
        if best_gmm is None:
            raise RuntimeError("[GMM] No se pudo ajustar ningún modelo.")

        print(f"[GMM] Óptimo final: k={best_gmm.n_components} (BIC={lowest_bic:.2f})")
        print(f"[GMM] Búsqueda terminada en {total_elapsed/60:.2f} min")
        return best_gmm
    # ------------------------------------------------------------
    # ESTIMACIÓN GENERAL
    # ------------------------------------------------------------
    def estimate(self, algorithm="kmeans"):
        print(f"Estimando warehouses | algoritmo={algorithm}")

        df_cust = self.df_customers.copy()
        df_geo = self.df_geolocation.copy()

        # Normalizar nombres
        if "customer_zip_code_prefix" not in df_cust.columns:
            zip_col = [c for c in df_cust.columns if "zip" in c][0]
            df_cust = df_cust.rename(columns={zip_col: "customer_zip_code_prefix"})

        if "geolocation_zip_code_prefix" not in df_geo.columns:
            zip_col = [c for c in df_geo.columns if "zip" in c][0]
            df_geo = df_geo.rename(columns={zip_col: "geolocation_zip_code_prefix"})

        df_merge = pd.merge(
            df_cust,
            df_geo,
            left_on="customer_zip_code_prefix",
            right_on="geolocation_zip_code_prefix",
            how="left"
        )

        df_merge["geolocation_lat"] = pd.to_numeric(df_merge["geolocation_lat"], errors="coerce")
        df_merge["geolocation_lng"] = pd.to_numeric(df_merge["geolocation_lng"], errors="coerce")
        df_merge = df_merge.dropna(subset=["geolocation_lat", "geolocation_lng"])

        if df_merge.empty:
            raise ValueError("No coordenadas válidas")

        coords = df_merge[["geolocation_lat", "geolocation_lng"]].values

        # --------------------------------------------------------
        # Selección del algoritmo
        # --------------------------------------------------------
        if algorithm == "minibatch":
            model, optimal_k = self._select_best_minibatch(coords, k_min=10, k_max=70)
            df_merge["cluster"] = model.predict(coords)
            self.n_clusters = optimal_k

        elif algorithm == "gmm":
            best_gmm = self._select_best_gmm(coords)

            # <<< FIX IMPORTANTE >>>
            # Usar PCA transformada para predicción
            coords_reduced = self.pca_gmm.transform(coords)
            df_merge["cluster"] = best_gmm.predict(coords_reduced)

            self.n_clusters = best_gmm.n_components

        else:  # KMEANS clásico
            model, optimal_k = self._select_best_kmeans(coords, k_min=10, k_max=70)
            df_merge["cluster"] = model.predict(coords)
            self.n_clusters = optimal_k

        # --------------------------------------------------------
        # UNIÓN CON ITEMS, PEDIDOS, PRODUCTOS
        # --------------------------------------------------------
        df_full = (
            self.df_orders.merge(self.df_items, on="order_id", how="inner")
            .merge(self.df_products, on="product_id", how="left")
            .merge(df_merge[["customer_id", "cluster"]], on="customer_id", how="left")
        )

        warehouses = []
        valid_clusters = sorted(df_full["cluster"].dropna().unique())
        total_customers = df_merge["customer_id"].nunique()

        # --------------------------------------------------------
        # CENTROIDES + OUTLIERS + SUBCLUSTERS
        # --------------------------------------------------------
        for cluster_id in valid_clusters:
            cluster_points = df_merge[df_merge["cluster"] == cluster_id]
            if cluster_points.empty:
                continue

            lat_mean = cluster_points["geolocation_lat"].mean()
            lon_mean = cluster_points["geolocation_lng"].mean()
            coords_cluster = cluster_points[["geolocation_lat", "geolocation_lng"]].values

            centroid = np.array([lat_mean, lon_mean])
            distances = cdist(coords_cluster, [centroid])
            outlier_mask = distances[:, 0] > np.percentile(distances, 95)
            cluster_points_clean = cluster_points[~outlier_mask]

            density = cluster_points_clean["customer_id"].nunique()
            ratio = density / total_customers

            cluster_items = df_full[df_full["cluster"] == cluster_id]
            top_items = cluster_items["product_id"].value_counts().head(5).index.tolist()

            # SUBCLUSTERS AUTOMÁTICOS
            if ratio > 0.08:
                sub_k = min(3, int(ratio * 100))
                sub_model = KMeans(n_clusters=sub_k, random_state=42)
                sub_labels = sub_model.fit_predict(
                    cluster_points_clean[["geolocation_lat", "geolocation_lng"]].values
                )

                for sub_id in range(sub_k):
                    sub_pts = cluster_points_clean[sub_labels == sub_id]
                    if sub_pts.empty:
                        continue

                    sub_lat = sub_pts["geolocation_lat"].mean()
                    sub_lon = sub_pts["geolocation_lng"].mean()
                    sub_density = sub_pts["customer_id"].nunique()
                    sub_ratio = sub_density / total_customers

                    size = (
                        "large" if sub_ratio > 0.04 else
                        "medium" if sub_ratio > 0.015 else
                        "small"
                    )

                    base, maxv = 10, 25
                    improvement = round(base + (maxv - base) * min(sub_ratio / 0.1, 1), 2)

                    warehouses.append({
                        "warehouse_id": f"{cluster_id}_{sub_id}",
                        "latitude": float(sub_lat),
                        "longitude": float(sub_lon),
                        "customer_count": int(sub_density),
                        "density_ratio": round(sub_ratio, 4),
                        "warehouse_size": size,
                        "estimated_delivery_improvement_%": improvement,
                        "top_items": top_items,
                        "note": "Subcluster automático",
                        "algorithm": algorithm
                    })

                continue

            # CLUSTER NORMAL
            size = (
                "large" if ratio > 0.04 else
                "medium" if ratio > 0.015 else
                "small"
            )

            base, maxv = 10, 25
            improvement = round(base + (maxv - base) * min(ratio / 0.1, 1), 2)

            warehouses.append({
                "warehouse_id": int(cluster_id),
                "latitude": float(lat_mean),
                "longitude": float(lon_mean),
                "customer_count": int(density),
                "density_ratio": round(ratio, 4),
                "warehouse_size": size,
                "estimated_delivery_improvement_%": improvement,
                "top_items": top_items,
                "note": "Cluster normal",
                "algorithm": algorithm
            })

        # --------------------------------------------------------
        # LOGS
        # --------------------------------------------------------
        sizes = [wh["warehouse_size"] for wh in warehouses]
        log_summary = {
            "algorithm": algorithm,
            "total_warehouses": len(warehouses),
            "large": sizes.count("large"),
            "medium": sizes.count("medium"),
            "small": sizes.count("small")
        }

        self.logs.append(log_summary)
        print(f"{algorithm.upper()} | Warehouses: {log_summary}")

        return warehouses
