import os
from typing import Any, Dict, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import random


# ============================================================
# Carga de configuración y conexión a MongoDB
# ============================================================

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "ecommerce_brazil")

if not MONGODB_URI:
    raise RuntimeError(
        "MONGODB_URI no está definido. "
        "Creá un archivo .env basado en .env.example y completa MONGODB_URI."
    )

# Conexión directa con PyMongo
client = MongoClient(MONGODB_URI)
db = client[MONGODB_DATABASE]


def fetch_collection(
    collection_name: str,
    limit: int | None = None,
) -> List[Dict[str, Any]]:
    """
    Devuelve documentos de una colección como lista de dicts.
    Convierte los ObjectId de Mongo (_id) a str para que FastAPI
    pueda serializarlos a JSON sin errores.
    """
    try:
        collection = db[collection_name]
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error accediendo a la colección '{collection_name}': {exc}",
        )

    cursor = collection.find()
    if limit is not None:
        cursor = cursor.limit(limit)

    docs = list(cursor)

    # Convertir ObjectId -> str
    for doc in docs:
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])

    return docs


def spread_points(points, max_points, precision=2):
    """
    Espacia puntos agrupando por lat/lon redondeados a `precision` decimales.
    - 2 decimales ≈ 1 km
    - 3 decimales ≈ 100 m
    """
    if not points:
        return []

    random.shuffle(points)

    seen = set()
    result = []

    for p in points:
        lat = p.get("lat")
        lon = p.get("lon")
        if lat is None or lon is None:
            continue

        cell = (round(lat, precision), round(lon, precision))

        if cell in seen:
            continue

        seen.add(cell)
        result.append({"lat": cell[0], "lon": cell[1]})

        if len(result) >= max_points:
            break

    return result

# ============================================================
# Inicialización de FastAPI
# ============================================================

app = FastAPI(
    title="CDD – API de Modelos de Clustering",
    description=(
        "API para exponer resultados procesados del pipeline ETL de e-commerce Brazil.\n\n"
        "Colecciones principales disponibles:\n"
        "• customers\n"
        "• sellers\n"
        "• products\n"
        "• order_items\n"
        "• geolocation\n"
        "• economic_indicators\n"
        "• processed_results_gmm\n"
        "• processed_results_kmeans\n"
        "• processed_results_minibatch\n"
    ),
    version="1.0.0",
)

# CORS básico para que el front pueda consumir sin problemas
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # si quieren, más adelante se puede restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Endpoints utilitarios
# ============================================================

# @app.get("/", summary="Ping básico")
# async def root() -> Dict[str, str]:
#     """Endpoint simple para verificar que el backend está vivo."""
#     return {"message": "API de clustering CCD-TPO operativa"}


# @app.get("/health", summary="Healthcheck de MongoDB")
# async def healthcheck() -> Dict[str, Any]:
#     """Verifica conexión con MongoDB y devuelve info mínima."""
#     try:
#         db_names = client.list_database_names()
#         return {
#             "status": "ok",
#             "databases": db_names,
#             "active_database": MONGODB_DATABASE,
#         }
#     except Exception as exc:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Error conectando a MongoDB: {exc}",
#         )


# ============================================================
# Endpoints de modelos (GMM, KMeans, MiniBatch)
# ============================================================

def _get_model_results(collection_name: str, model_name: str) -> Dict[str, Any]:
    """
    Función común para leer las colecciones processed_results_*.

    Cada una tiene hoy un único documento con:
    - timestamp
    - metrics
    - economic_analysis
    - delivery_stats
    - warehouses (array)
    - cluster_logs (array)
    - notes
    """
    docs = fetch_collection(collection_name, limit=1)

    return {
        "model": model_name,
        "count": len(docs),
        "data": docs,
    }


@app.get("/models/gmm", summary="Resultados del modelo GMM")
async def get_gmm(
    limit: int = Query(1, ge=1, le=100),  # se mantiene por compatibilidad
) -> Dict[str, Any]:
    return _get_model_results("processed_results_gmm", "gmm")


@app.get("/models/kmeans", summary="Resultados del modelo KMeans")
async def get_kmeans(
    limit: int = Query(1, ge=1, le=100),
) -> Dict[str, Any]:
    return _get_model_results("processed_results_kmeans", "kmeans")


@app.get("/models/minibatch", summary="Resultados del modelo MiniBatch KMeans")
async def get_minibatch(
    limit: int = Query(1, ge=1, le=100),
) -> Dict[str, Any]:
    return _get_model_results("processed_results_minibatch", "minibatch")



# ============================================================
# Endpoints espaciales para el front (warehouses)
# ============================================================

@app.get(
    "/models/gmm/warehouses",
    summary="Datos espaciales (warehouses) del modelo GMM",
)
async def get_gmm_warehouses() -> Dict[str, Any]:
    docs = fetch_collection("processed_results_gmm", limit=1)
    if not docs:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron resultados procesados para GMM.",
        )

    warehouses = docs[0].get("warehouses", [])
    return {
        "model": "gmm",
        "warehouses": warehouses,
    }


@app.get(
    "/models/kmeans/warehouses",
    summary="Datos espaciales (warehouses) del modelo KMeans",
)
async def get_kmeans_warehouses() -> Dict[str, Any]:
    docs = fetch_collection("processed_results_kmeans", limit=1)
    if not docs:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron resultados procesados para KMeans.",
        )

    warehouses = docs[0].get("warehouses", [])
    return {
        "model": "kmeans",
        "warehouses": warehouses,
    }


@app.get(
    "/models/minibatch/warehouses",
    summary="Datos espaciales (warehouses) del modelo MiniBatch KMeans",
)
async def get_minibatch_warehouses() -> Dict[str, Any]:
    docs = fetch_collection("processed_results_minibatch", limit=1)
    if not docs:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron resultados procesados para MiniBatch KMeans.",
        )

    warehouses = docs[0].get("warehouses", [])
    return {
        "model": "minibatch",
        "warehouses": warehouses,
    }



# ============================================================
# Endpoints especializados para las colecciones base
# ============================================================

# @app.get("/collections/customers/basic", summary="Listado básico de customers")
# async def get_basic_customers(limit: int = Query(100, ge=1, le=1000)):
#     docs = fetch_collection("customers", limit=limit)

#     # Devolver solo campos clave
#     customers = [
#         {
#             "customer_id": doc.get("customer_id"),
#             "state": doc.get("customer_state"),
#             "city": doc.get("customer_city"),
#             "lat": doc.get("geolocation", {}).get("lat", None),
#             "lon": doc.get("geolocation", {}).get("lon", None)
#         }
#         for doc in docs
#     ]
#     return {"count": len(customers), "customers": customers}


# @app.get("/collections/sellers/basic", summary="Listado básico de sellers")
# async def get_basic_sellers(limit: int = Query(100, ge=1, le=1000)):
#     docs = fetch_collection("sellers", limit=limit)
#     sellers = [
#         {
#             "seller_id": doc.get("seller_id"),
#             "state": doc.get("seller_state"),
#             "city": doc.get("seller_city"),
#             "lat": doc.get("geolocation", {}).get("lat", None),
#             "lon": doc.get("geolocation", {}).get("lon", None)
#         }
#         for doc in docs
#     ]
#     return {"count": len(sellers), "sellers": sellers}



# @app.get("/collections/geolocation", summary="Datos crudos de geolocalización")
# async def get_geolocation(limit: int = Query(100, ge=1, le=1000)):
#     docs = fetch_collection("geolocation", limit=limit)
#     return {"count": len(docs), "data": docs}


# @app.get("/collections/economic_indicators", summary="Datos de indicadores económicos")
# async def get_economic_indicators(limit: int = Query(100, ge=1, le=1000)):
#     docs = fetch_collection("economic_indicators", limit=limit)
#     return {"count": len(docs), "data": docs}

# ============================================================


@app.get(
    "/heatmap/customers",
    summary="Heatmap de customers por geolocalización",
)
async def get_customer_heatmap(
    limit: int = Query(
        50_000,
        ge=1,
        le=200_000,
        description="Cantidad máxima de customers a considerar en el heatmap",
    ),
    bucket_precision: int = Query(
        2,
        ge=0,
        le=6,
        description=(
            "Cantidad de decimales para agrupar lat/lon. "
            "Ej: 2 ≈ zonas de ~1km. 0 = agrupar por grado entero."
        ),
    ),
) -> Dict[str, Any]:
    """
    Devuelve datos agregados para un heatmap de customers.

    - Joinea customers.customer_zip_code_prefix con
      geolocation.geolocation_zip_code_prefix.
    - Obtiene geolocation_lat y geolocation_lng por cliente.
    - Agrupa por coordenadas redondeadas (bucket) y calcula weight
      = cantidad de customers en ese bucket.

    Respuesta con forma:
    {
      "points": [
        { "lat": -23.54, "lon": -46.63, "weight": 5 },
        ...
      ]
    }
    """
    try:
        pipeline = [
            # Limitamos la cantidad de customers a considerar
            {"$limit": limit},

            # Join con la colección geolocation
            {
                "$lookup": {
                    "from": "geolocation",
                    "localField": "customer_zip_code_prefix",
                    "foreignField": "geolocation_zip_code_prefix",
                    "as": "geo",
                }
            },
            # Nos quedamos con un solo geo por customer
            {"$unwind": "$geo"},

            # Proyectamos solo las coordenadas
            {
                "$project": {
                    "_id": 0,
                    "lat": "$geo.geolocation_lat",
                    "lon": "$geo.geolocation_lng",
                }
            },
        ]

        # Agrupamos por bucket (lat/lon redondeados)
        pipeline.extend(
            [
                {
                    "$group": {
                        "_id": {
                            "lat": {"$round": ["$lat", bucket_precision]},
                            "lon": {"$round": ["$lon", bucket_precision]},
                        },
                        "weight": {"$sum": 1},
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "lat": "$_id.lat",
                        "lon": "$_id.lon",
                        "weight": 1,
                    }
                },
            ]
        )

        cursor = db["customers"].aggregate(pipeline)
        points = list(cursor)

        return {"points": points}

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error construyendo heatmap de customers: {exc}",
        )
# ============================================================

@app.get(
    "/map/customers-sellers",
    summary="Mapa de customers y sellers usando geolocation con puntos espaciados",
)
async def get_customers_sellers_map(
    limit_customers: int = Query(
        1000,
        ge=1,
        le=10_000,
        description="Cantidad de puntos de customers a devolver (máximo)",
    ),
    limit_sellers: int = Query(
        1000,
        ge=1,
        le=10_000,
        description="Cantidad de puntos de sellers a devolver (máximo)",
    ),
    spread_precision: int = Query(
        2,
        ge=0,
        le=4,
        description="Decimales para agrupar puntos cercanos (2 ≈ 1km, 3 ≈ 100m)",
    ),
) -> Dict[str, Any]:
    try:
        # ============================
        # CARGAR GEOLOCATION UNA VEZ
        # ============================
        geos = fetch_collection("geolocation")
        geo_map = {}

        for g in geos:
            prefix = g.get("geolocation_zip_code_prefix")
            lat = g.get("geolocation_lat")
            lon = g.get("geolocation_lng")

            if prefix is not None and lat is not None and lon is not None:
                if prefix not in geo_map:
                    geo_map[prefix] = {"lat": lat, "lon": lon}

        # ============================
        # CUSTOMERS
        # ============================
        CUSTOMERS_POOL_SIZE = min(5 * limit_customers, 10_000)
        customers_docs = fetch_collection("customers", limit=CUSTOMERS_POOL_SIZE)

        customer_points = []
        for doc in customers_docs:
            lat = None
            lon = None

            # caso 1: geolocation embebido
            emb = doc.get("geolocation")
            if isinstance(emb, dict):
                lat = emb.get("lat")
                lon = emb.get("lon")

            # caso 2: lookup en geo_map
            if lat is None or lon is None:
                prefix = doc.get("customer_zip_code_prefix")
                if prefix in geo_map:
                    lat = geo_map[prefix]["lat"]
                    lon = geo_map[prefix]["lon"]

            if lat is not None and lon is not None:
                customer_points.append({"lat": lat, "lon": lon})

        # aplicar SPREAD
        customers_final = spread_points(
            customer_points,
            max_points=limit_customers,
            precision=spread_precision,
        )

        # ============================
        # SELLERS
        # ============================
        SELLERS_POOL_SIZE = min(5 * limit_sellers, 10_000)
        sellers_docs = fetch_collection("sellers", limit=SELLERS_POOL_SIZE)

        seller_points = []
        for doc in sellers_docs:
            lat = None
            lon = None

            emb = doc.get("geolocation")
            if isinstance(emb, dict):
                lat = emb.get("lat")
                lon = emb.get("lon")

            if lat is None or lon is None:
                prefix = doc.get("seller_zip_code_prefix")
                if prefix in geo_map:
                    lat = geo_map[prefix]["lat"]
                    lon = geo_map[prefix]["lon"]

            if lat is not None and lon is not None:
                seller_points.append({"lat": lat, "lon": lon})

        # aplicar SPREAD
        sellers_final = spread_points(
            seller_points,
            max_points=limit_sellers,
            precision=spread_precision,
        )

        return {
            "customers": customers_final,
            "sellers": sellers_final,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando datos de mapa: {exc}",
        )

    
# ============================================================

@app.get(
    "/charts/orders-time-series",
    summary="Serie temporal de cantidad de órdenes",
)
async def get_orders_time_series(
    period: str = Query(
        "month",
        description="Granularidad de la serie: 'day' o 'month'",
        regex="^(day|month)$",
    ),
) -> Dict[str, Any]:
    """
    Devuelve datos para un gráfico de línea / barras con esta forma:

    {
      "series": [
        {
          "label": "Cantidad de órdenes",
          "points": [
            { "date": "2017-11", "value": 123 },
            { "date": "2017-12", "value": 150 }
          ]
        }
      ]
    }

    Usa orders.order_purchase_timestamp (string) para agrupar por día/mes.
    """
    try:
        orders_collection = db["orders"]

        # 1) Convertimos el string de timestamp a tipo Date dentro del pipeline
        date_parse_stage = {
            "$addFields": {
                "order_purchase_date": {
                    "$dateFromString": {
                        "dateString": "$order_purchase_timestamp"
                        # Si quisieras especificar formato:
                        # "format": "%Y-%m-%d %H:%M:%S",
                    }
                }
            }
        }

        # 2) Definir agrupación por día o por mes
        if period == "month":
            group_id = {
                "year": {"$year": "$order_purchase_date"},
                "month": {"$month": "$order_purchase_date"},
            }
            date_expression = {
                "$dateToString": {
                    "format": "%Y-%m",  # "2017-11"
                    "date": "$order_purchase_date",
                }
            }
        else:  # "day"
            group_id = {
                "year": {"$year": "$order_purchase_date"},
                "month": {"$month": "$order_purchase_date"},
                "day": {"$dayOfMonth": "$order_purchase_date"},
            }
            date_expression = {
                "$dateToString": {
                    "format": "%Y-%m-%d",  # "2017-11-01"
                    "date": "$order_purchase_date",
                }
            }

        # 3) Pipeline: contar órdenes por día/mes
        pipeline = [
            date_parse_stage,
            {
                "$match": {
                    "order_purchase_date": {"$type": "date"},
                }
            },
            {
                "$group": {
                    "_id": group_id,
                    "date": {"$first": date_expression},
                    "total_orders": {"$sum": 1},
                }
            },
            {"$sort": {"date": 1}},
            {
                "$project": {
                    "_id": 0,
                    "date": "$date",
                    "value": "$total_orders",
                }
            },
        ]

        cursor = orders_collection.aggregate(pipeline, allowDiskUse=True)
        raw_points = list(cursor)

        # Armamos el JSON con el formato pedido
        points = [
            {
                "date": doc["date"],
                "value": float(doc["value"]),
            }
            for doc in raw_points
        ]

        return {
            "series": [
                {
                    "label": "Cantidad de órdenes",
                    "points": points,
                }
            ]
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando serie temporal de órdenes: {exc}",
        )


# ============================================================

@app.get(
    "/charts/category-consumption",
    summary="Consumo por categoría (ventas, órdenes e ítems)",
)
async def get_category_consumption() -> Dict[str, Any]:
    """
    Devuelve consumo por categoría con este formato:

    {
      "categories": [
        {
          "category": "artes",
          "totalSales": 250000.5,
          "ordersCount": 1234,
          "itemsCount": 1600
        }
      ]
    }

    Notas:
    - Se evita usar $group en MongoDB por límite de memoria del cluster.
    - Se lee una cantidad limitada de order_items y se agrega en Python.
    """
    try:
        order_items_coll = db["order_items"]
        products_coll = db["products"]

        # ================================
        # 1) Mapeo product_id -> categoría
        # ================================
        products_cursor = products_coll.find(
            {},
            {"_id": 0, "product_id": 1, "product_category_name": 1},
        )

        product_to_category: Dict[str, str] = {}
        for p in products_cursor:
            pid = p.get("product_id")
            if pid is None:
                continue
            product_to_category[pid] = p.get("product_category_name", "unknown")

        # ==========================================
        # 2) Leer una muestra/limite de order_items
        # ==========================================
        # Ajustá este límite si querés más/menos precisión.
        MAX_ITEMS = 200_000

        items_cursor = order_items_coll.find(
            {},
            {
                "_id": 0,
                "product_id": 1,
                "price": 1,
                "order_id": 1,
            },
        ).limit(MAX_ITEMS)

        # ===================================
        # 3) Agregación en Python por categoría
        # ===================================
        category_data: Dict[str, Dict[str, Any]] = {}

        for item in items_cursor:
            product_id = item.get("product_id")
            if not product_id:
                continue

            category = product_to_category.get(product_id, "unknown")

            price = float(item.get("price", 0.0))
            order_id = item.get("order_id")

            if category not in category_data:
                category_data[category] = {
                    "category": category,
                    "totalSales": 0.0,
                    "itemsCount": 0,
                    "ordersSet": set(),
                }

            cat_entry = category_data[category]
            cat_entry["totalSales"] += price
            cat_entry["itemsCount"] += 1
            if order_id is not None:
                cat_entry["ordersSet"].add(order_id)

        # ========================
        # 4) Formateo de respuesta
        # ========================
        categories: List[Dict[str, Any]] = []
        for cat_entry in category_data.values():
            categories.append(
                {
                    "category": cat_entry["category"],
                    "totalSales": cat_entry["totalSales"],
                    "ordersCount": len(cat_entry["ordersSet"]),
                    "itemsCount": cat_entry["itemsCount"],
                }
            )

        # Ordenar por ventas descendente
        categories.sort(key=lambda x: x["totalSales"], reverse=True)

        return {"categories": categories}

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando consumo por categoría: {exc}",
        )


# ============================================================
@app.get(
    "/charts/state-consumption",
    summary="Consumo por estado (ventas y órdenes)",
)
async def get_state_consumption() -> Dict[str, Any]:
    """
    Devuelve consumo por estado:

    {
      "states": [
        { "state": "SP", "totalSales": 500000.123, "ordersCount": 3000 },
        { "state": "RJ", "totalSales": 200000.456, "ordersCount": 1200 }
      ]
    }
    """
    try:
        customers_coll = db["customers"]
        orders_coll = db["orders"]
        order_items_coll = db["order_items"]

        # 1) customer_id -> state
        customer_to_state: Dict[str, str] = {}
        customers_cursor = customers_coll.find(
            {}, {"_id": 0, "customer_id": 1, "customer_state": 1}
        )
        for c in customers_cursor:
            cid = c.get("customer_id")
            st = c.get("customer_state")
            if cid and st:
                customer_to_state[cid] = st

        # 2) order_id -> state y conteo de órdenes
        order_to_state: Dict[str, str] = {}
        state_data: Dict[str, Dict[str, Any]] = {}

        orders_cursor = orders_coll.find(
            {}, {"_id": 0, "order_id": 1, "customer_id": 1}
        )
        for o in orders_cursor:
            oid = o.get("order_id")
            cid = o.get("customer_id")
            if not oid or not cid:
                continue

            state = customer_to_state.get(cid)
            if not state:
                continue

            order_to_state[oid] = state

            if state not in state_data:
                state_data[state] = {
                    "state": state,
                    "totalSales": 0.0,
                    "ordersCount": 0,
                }

            state_data[state]["ordersCount"] += 1

        # 3) Sumar price por estado desde order_items
        MAX_ITEMS = 200_000

        items_cursor = order_items_coll.find(
            {}, {"_id": 0, "order_id": 1, "price": 1}
        ).limit(MAX_ITEMS)

        for item in items_cursor:
            oid = item.get("order_id")
            if not oid:
                continue

            state = order_to_state.get(oid)
            if not state:
                continue

            price = float(item.get("price", 0.0))
            state_data[state]["totalSales"] += price

        # 4) Formato final (REDONDEANDO A 3 DECIMALES)
        states: List[Dict[str, Any]] = []
        for entry in state_data.values():
            states.append(
                {
                    "state": entry["state"],
                    "totalSales": round(entry["totalSales"], 3),  # ← acá está el cambio
                    "ordersCount": entry["ordersCount"],
                }
            )

        states.sort(key=lambda x: x["totalSales"], reverse=True)

        return {"states": states}

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando consumo por estado: {exc}",
        )

# ============================================================
from typing import Any, Dict, List  # ya lo tenés arriba
from fastapi import Query           # ya importado arriba

@app.get(
    "/charts/macro-correlation",
    summary="Correlograma ventas vs indicador económico",
)
async def get_macro_correlation(
    indicator: str = Query(
        "inflation",
        description="Campo de economic_indicators: 'inflation', 'usd_brl', etc.",
    ),
    unit: str = Query(
        "",
        description="Unidad del indicador: '%%', 'BRL', etc. (solo para mostrar en el gráfico)",
    ),
) -> Dict[str, Any]:
    """
    Devuelve datos para un correlograma mensual entre un indicador macro y las ventas:

    {
      "indicator": "inflation",
      "unit": "%",
      "points": [
        { "date": "2017-01", "indicatorValue": 4.5, "salesValue": 100000.0 },
        { "date": "2017-02", "indicatorValue": 4.7, "salesValue": 95000.0 }
      ]
    }

    Lado macro:
    - economic_indicators.date (ej: "01/10/2012") -> mes "YYYY-MM"
    - economic_indicators[indicator] -> indicatorValue

    Lado ventas:
    - orders.order_purchase_timestamp -> mes "YYYY-MM"
    - order_items.price sumado por order_id -> mes
    """
    from datetime import datetime

    try:
        econ_coll = db["economic_indicators"]
        orders_coll = db["orders"]
        order_items_coll = db["order_items"]

        # ==========================================
        # 1) economic_indicators: mes -> indicatorValue
        # ==========================================
        month_to_indicator: Dict[str, float] = {}

        econ_cursor = econ_coll.find(
            {},
            {"_id": 0, "date": 1, indicator: 1},
        )

        for doc in econ_cursor:
            date_str = doc.get("date")
            if not date_str:
                continue

            # Parsear "01/10/2012" (dd/MM/yyyy). Si falla, intentar otros formatos comunes.
            dt = None
            for fmt in ("%d/%m/%Y", "%Y-%m-%d", "%Y/%m/%d"):
                try:
                    dt = datetime.strptime(date_str, fmt)
                    break
                except ValueError:
                    continue
            if dt is None:
                continue

            month_key = dt.strftime("%Y-%m")
            value = doc.get(indicator)
            if value is None:
                continue

            try:
                month_to_indicator[month_key] = float(value)
            except (TypeError, ValueError):
                continue

        # Si no hay datos de macro para ese indicador, devolver vacío
        if not month_to_indicator:
            return {"indicator": indicator, "unit": unit, "points": []}

        # ==========================================
        # 2) orders: order_id -> mes "YYYY-MM"
        # ==========================================
        order_to_month: Dict[str, str] = {}

        orders_cursor = orders_coll.find(
            {},
            {"_id": 0, "order_id": 1, "order_purchase_timestamp": 1},
        )

        for o in orders_cursor:
            oid = o.get("order_id")
            ts_str = o.get("order_purchase_timestamp")
            if not oid or not ts_str:
                continue

            dt = None
            # Ej típico: "2017-10-02 10:56:33"
            try:
                dt = datetime.fromisoformat(ts_str)
            except ValueError:
                try:
                    dt = datetime.strptime(ts_str, "%Y-%m-%d %H:%M:%S")
                except ValueError:
                    continue

            month_key = dt.strftime("%Y-%m")
            order_to_month[oid] = month_key

        # ==========================================
        # 3) order_items: sumar ventas por mes
        # ==========================================
        from collections import defaultdict

        month_to_sales: Dict[str, float] = defaultdict(float)

        MAX_ITEMS = 200_000  # límite para no matar el cluster

        items_cursor = order_items_coll.find(
            {},
            {"_id": 0, "order_id": 1, "price": 1},
        ).limit(MAX_ITEMS)

        for item in items_cursor:
            oid = item.get("order_id")
            if not oid:
                continue

            month_key = order_to_month.get(oid)
            if not month_key:
                continue

            try:
                price = float(item.get("price", 0.0))
            except (TypeError, ValueError):
                continue

            month_to_sales[month_key] += price

        # ==========================================
        # 4) Join por mes y armado de puntos
        # ==========================================
        common_months = sorted(
            set(month_to_indicator.keys()) & set(month_to_sales.keys())
        )

        points: List[Dict[str, Any]] = []
        for m in common_months:
            points.append(
                {
                    "date": m,
                    "indicatorValue": month_to_indicator[m],
                    "salesValue": round(month_to_sales[m], 3),
                }
            )

        return {
            "indicator": indicator,
            "unit": unit,
            "points": points,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error generando correlograma macroeconómico: {exc}",
        )
# ============================================================