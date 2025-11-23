import { warehouseLocations } from "@/data/warehouseLocations";
import type { AlgorithmType, PredictiveWarehouse } from "./predictiveTypes";

const defaultCollections: { name: string; algorithm?: AlgorithmType }[] = [
  { name: "processed_results_gmm", algorithm: "gmm" },
  { name: "processed_results_kmeans", algorithm: "kmeans" },
  { name: "processed_results_minibatch", algorithm: "minibatchkmeans" },
];

const shouldUseBackend = () => String(import.meta.env.VITE_USE_BACKEND).toLowerCase() === "true";

const getConfiguredCollections = () => {
  const rawCollections = import.meta.env.VITE_MONGO_COLLECTIONS?.split(",")
    .map((collection) => collection.trim())
    .filter(Boolean);

  if (rawCollections?.length) {
    return rawCollections.map((name) => ({ name }));
  }

  return defaultCollections;
};

const normalizeAlgorithm = (algorithm?: string, fallback?: AlgorithmType): AlgorithmType => {
  const value = algorithm?.toLowerCase() ?? fallback ?? "gmm";
  if (value.includes("mini")) return "minibatchkmeans";
  if (value.includes("kmeans")) return "kmeans";
  return "gmm";
};

const normalizeWarehouse = (
  payload: Record<string, any>,
  fallbackAlgorithm?: AlgorithmType,
): PredictiveWarehouse => ({
  warehouse_id: Number(payload.warehouse_id ?? payload.id ?? 0),
  latitude: Number(payload.latitude),
  longitude: Number(payload.longitude),
  customer_count: Number(payload.customer_count ?? payload.customerCount ?? 0),
  algorithm: normalizeAlgorithm(payload.algorithm, fallbackAlgorithm),
  note: payload.note,
  density_ratio: payload.density_ratio,
  warehouse_size: payload.warehouse_size,
  estimated_delivery_improvement_pct:
    payload["estimated_delivery_improvement_%"] ?? payload.estimated_delivery_improvement_pct,
  top_items: payload.top_items,
  estimated_customer_growth_1y: payload.estimated_customer_growth_1y,
  estimated_customer_growth_2y: payload.estimated_customer_growth_2y,
});

const fetchWarehousesFromMongo = async (): Promise<PredictiveWarehouse[]> => {
  const apiUrl = import.meta.env.VITE_MONGO_DATA_API_URL;
  const apiKey = import.meta.env.VITE_MONGO_DATA_API_KEY;
  const database = import.meta.env.VITE_MONGO_DATABASE;
  const dataSource = import.meta.env.VITE_MONGO_DATA_SOURCE;

  if (!apiUrl || !apiKey || !database || !dataSource) {
    console.warn(
      "Mongo Data API configuration is incomplete. Set VITE_MONGO_DATA_API_URL, VITE_MONGO_DATA_API_KEY, VITE_MONGO_DATABASE and VITE_MONGO_DATA_SOURCE.",
    );
    return warehouseLocations;
  }

  const collections = getConfiguredCollections();

  const requests = collections.map(async ({ name, algorithm }) => {
    const response = await fetch(`${apiUrl}/action/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        dataSource,
        database,
        collection: name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mongo Data API responded with ${response.status}`);
    }

    const data = await response.json();
    const documents = data?.documents ?? [];
    return documents.map((document: Record<string, any>) => normalizeWarehouse(document, algorithm));
  });

  const results = await Promise.all(requests);
  const flattened = results.flat();

  if (!flattened.length) {
    console.warn("Mongo Data API returned no documents, falling back to local dataset.");
    return warehouseLocations;
  }

  return flattened;
};

const fetchWarehousesFromBackend = async (): Promise<PredictiveWarehouse[]> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const response = await fetch(`${backendUrl}/predictive/warehouses`);
  if (!response.ok) {
    throw new Error(`Backend responded with status ${response.status}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Backend did not return an array of warehouse predictions.");
  }

  return payload.map((item) => normalizeWarehouse(item));
};

export const fetchWarehousePredictions = async (): Promise<PredictiveWarehouse[]> => {
  if (shouldUseBackend()) {
    return fetchWarehousesFromBackend();
  }

  try {
    return await fetchWarehousesFromMongo();
  } catch (error) {
    console.error("Failed to fetch from Mongo Data API, falling back to local dataset.", error);
    return warehouseLocations;
  }
};
