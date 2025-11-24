import { customerHeatmapMock } from "@/data/customerHeatmapMock";
import type { CustomerHeatmapData, CustomerHeatmapPoint } from "./heatmapTypes";

type RawHeatmapPoint = Partial<
  Record<
    "lat" | "geolocation_lat" | "latitude" | "lon" | "geolocation_lng" | "longitude" | "weight" | "count",
    unknown
  >
>;

type RawHeatmapResponse = {
  points?: RawHeatmapPoint[];
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value ?? fallback);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizePoint = (payload: RawHeatmapPoint): CustomerHeatmapPoint => ({
  lat: toNumber(payload.lat ?? payload.geolocation_lat ?? payload.latitude),
  lon: toNumber(payload.lon ?? payload.geolocation_lng ?? payload.longitude),
  weight: toNumber(payload.weight ?? payload.count),
});

const isValidResponse = (payload: unknown): payload is RawHeatmapResponse =>
  typeof payload === "object" && payload !== null && Array.isArray((payload as RawHeatmapResponse).points);

export const fetchCustomerHeatmap = async (): Promise<CustomerHeatmapData> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const endpoint = backendUrl ? `${backendUrl}/api/heatmap/customers` : null;

  if (!endpoint) {
    console.warn("VITE_BACKEND_URL is not set. Using mock customer heatmap data.");
    return customerHeatmapMock;
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const payload = (await response.json()) as unknown;

    if (!isValidResponse(payload)) {
      throw new Error("Backend payload is not in the expected format.");
    }

    const points = payload.points
      .map(normalizePoint)
      .filter((point) => !Number.isNaN(point.lat) && !Number.isNaN(point.lon));

    if (!points.length) {
      console.warn("Backend returned no valid heatmap points, using mock dataset.");
      return customerHeatmapMock;
    }

    return { points };
  } catch (error) {
    console.error("Failed to fetch customer heatmap data, using mock dataset.", error);
    return customerHeatmapMock;
  }
};
