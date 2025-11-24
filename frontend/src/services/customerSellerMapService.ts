import { customerSellerMapMock } from "@/data/customerSellerMapMock";
import type { CustomerSellerMapData, MapPoint } from "./customerSellerMapTypes";

type RawMapPoint = Partial<Record<"lat" | "lon" | "latitude" | "longitude" | "geolocation_lat" | "geolocation_lng", unknown>>;

type RawMapResponse = {
  customers?: RawMapPoint[];
  sellers?: RawMapPoint[];
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value ?? fallback);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizePoint = (payload: RawMapPoint): MapPoint => ({
  lat: toNumber(payload.lat ?? payload.latitude ?? payload.geolocation_lat),
  lon: toNumber(payload.lon ?? payload.longitude ?? payload.geolocation_lng),
});

const isValidResponse = (payload: unknown): payload is RawMapResponse =>
  typeof payload === "object" &&
  payload !== null &&
  (Array.isArray((payload as RawMapResponse).customers) || Array.isArray((payload as RawMapResponse).sellers));

const sanitizePoints = (points: RawMapPoint[] | undefined) =>
  (points ?? [])
    .map(normalizePoint)
    .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lon));

export const fetchCustomerSellerMap = async (): Promise<CustomerSellerMapData> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const endpoint = backendUrl ? `${backendUrl}/api/map/customers-sellers` : null;

  if (!endpoint) {
    console.warn("VITE_BACKEND_URL is not set. Using mock customer-seller map data.");
    return customerSellerMapMock;
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

    const customers = sanitizePoints(payload.customers);
    const sellers = sanitizePoints(payload.sellers);

    if (!customers.length && !sellers.length) {
      console.warn("Backend returned no valid map points, using mock dataset.");
      return customerSellerMapMock;
    }

    return { customers, sellers };
  } catch (error) {
    console.error("Failed to fetch customer-seller map data, using mock dataset.", error);
    return customerSellerMapMock;
  }
};
