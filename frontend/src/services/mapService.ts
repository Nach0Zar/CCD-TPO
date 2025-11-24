import { mockCustomerHeatmap } from "@/data/mockCustomerHeatmap";
import { mockCustomerSellerMap } from "@/data/mockCustomerSellerMap";
import type { CustomerHeatmapData, CustomerSellerMapData } from "./mapTypes";

const getBackendBaseUrl = () => import.meta.env.VITE_BACKEND_URL?.toString().trim();

const normalizeHeatmapPoint = (point: any) => ({
  lat: Number(point.lat ?? point.latitude ?? point.geolocation_lat),
  lon: Number(point.lon ?? point.longitude ?? point.geolocation_lng),
  weight: Number(point.weight ?? point.count ?? 0),
});

const normalizeMapPoint = (point: any) => ({
  lat: Number(point.lat ?? point.latitude),
  lon: Number(point.lon ?? point.longitude),
});

const normalizeCustomerSellerPayload = (payload: any): CustomerSellerMapData => ({
  customers: Array.isArray(payload?.customers) ? payload.customers.map(normalizeMapPoint) : [],
  sellers: Array.isArray(payload?.sellers) ? payload.sellers.map(normalizeMapPoint) : [],
});

export const fetchCustomerHeatmap = async (): Promise<CustomerHeatmapData> => {
  const baseUrl = getBackendBaseUrl();

  if (!baseUrl) {
    console.warn("Backend URL not configured, returning mock customer heatmap dataset.");
    return mockCustomerHeatmap;
  }

  try {
    const response = await fetch(`${baseUrl}/api/heatmap/customers`);

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const payload = await response.json();

    if (!payload?.points || !Array.isArray(payload.points)) {
      throw new Error("Backend payload does not include a 'points' array.");
    }

    return {
      points: payload.points.map(normalizeHeatmapPoint),
    };
  } catch (error) {
    console.error("Failed to fetch customer heatmap data, falling back to mock dataset.", error);
    return mockCustomerHeatmap;
  }
};

export const fetchCustomerSellerMap = async (): Promise<CustomerSellerMapData> => {
  const baseUrl = getBackendBaseUrl();

  if (!baseUrl) {
    console.warn("Backend URL not configured, returning mock customer and seller map dataset.");
    return mockCustomerSellerMap;
  }

  try {
    const response = await fetch(`${baseUrl}/api/map/customers-sellers`);

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const payload = await response.json();

    const normalized = normalizeCustomerSellerPayload(payload);

    if (!normalized.customers.length && !normalized.sellers.length) {
      throw new Error("Backend payload did not return any customer or seller coordinates.");
    }

    return normalized;
  } catch (error) {
    console.error("Failed to fetch customer and seller map data, falling back to mock dataset.", error);
    return mockCustomerSellerMap;
  }
};
