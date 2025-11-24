import { customerHeatmapMock, customerSellerMapMock } from "@/mock/mapMock";

export interface CustomerHeatmapPoint {
  lat: number;
  lon: number;
  weight: number;
}

export interface CustomerHeatmapData {
  points: CustomerHeatmapPoint[];
}

export interface MapPoint {
  lat: number;
  lon: number;
}

export interface CustomerSellerMapData {
  customers: MapPoint[];
  sellers: MapPoint[];
}

async function fetchWithFallback<T>(url: string, mockData: T): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.warn(`Falling back to mock for ${url}:`, error);
    return mockData;
  }
}

export async function fetchCustomerHeatmap(): Promise<CustomerHeatmapData> {
  return fetchWithFallback<CustomerHeatmapData>("/api/heatmap/customers", customerHeatmapMock);
}

export async function fetchCustomerSellerPoints(): Promise<CustomerSellerMapData> {
  return fetchWithFallback<CustomerSellerMapData>("/api/map/customers-sellers", customerSellerMapMock);
}
