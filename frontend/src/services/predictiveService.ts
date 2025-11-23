import { warehouseLocations } from "@/data/warehouseLocations";
import type { AlgorithmType, PredictiveWarehouse } from "./predictiveTypes";

const defaultCollections: { name: string; algorithm?: AlgorithmType }[] = [
  { name: "processed_results_gmm", algorithm: "gmm" },
  { name: "processed_results_kmeans", algorithm: "kmeans" },
  { name: "processed_results_minibatch", algorithm: "minibatchkmeans" },
];

const shouldUseBackend = () => String(import.meta.env.VITE_USE_BACKEND).toLowerCase() === "true";

const loadMongoDriver = async () => {
  const isNodeRuntime = typeof process !== "undefined" && Boolean(process.versions?.node);
  if (!isNodeRuntime) {
    throw new Error(
      "Direct MongoDB access requires a Node.js runtime. Enable the backend or run the frontend with server rendering.",
    );
  }

  try {
    // Use eval to avoid bundling the driver when it isn't installed in the current environment
    // eslint-disable-next-line no-eval
    return await (0, eval)("import('mongodb')");
  } catch (error) {
    throw new Error(
      "Failed to load MongoDB driver. Install the 'mongodb' package in the frontend workspace or enable backend mode.",
    );
  }
};

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
  const mongoUri = import.meta.env.VITE_MONGO_URI;
  const databaseName = import.meta.env.VITE_MONGO_DATABASE;

  if (!mongoUri || !databaseName) {
    throw new Error(
      "Mongo configuration is incomplete. Provide VITE_MONGO_URI and VITE_MONGO_DATABASE, or enable backend mode.",
    );
  }

  const { MongoClient } = await loadMongoDriver();
  const client = new MongoClient(String(mongoUri));
  const collections = getConfiguredCollections();

  try {
    await client.connect();
    const db = client.db(databaseName);

    const results = await Promise.all(
      collections.map(async ({ name, algorithm }) => {
        const documents = await db.collection(name).find({}).toArray();
        return documents.map((document: Record<string, any>) => normalizeWarehouse(document, algorithm));
      }),
    );

    const flattened = results.flat();
    if (!flattened.length) {
      console.warn("Mongo query returned no documents, falling back to local dataset.");
      return warehouseLocations;
    }

    return flattened;
  } finally {
    await client.close().catch(() => undefined);
  }
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
    console.error("Failed to fetch directly from MongoDB, attempting backend before falling back.", error);

    try {
      return await fetchWarehousesFromBackend();
    } catch (backendError) {
      console.error("Backend fetch also failed, returning bundled sample data.", backendError);
      return warehouseLocations;
    }
  }
};
