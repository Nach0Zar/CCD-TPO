import { mockCategoryConsumptionData, mockTimeSeriesChartData } from "@/mocks/historicalMock";

export interface TimePoint {
  date: string; // "2017-11" o "2017-11-01"
  value: number; // ventas totales, número de órdenes, etc.
}

export interface TimeSeries {
  label: string; // "Total ventas", "Órdenes entregadas", etc.
  points: TimePoint[];
}

export interface TimeSeriesChartData {
  series: TimeSeries[];
}

export interface CategoryConsumption {
  category: string; // product_category_name
  totalSales: number; // suma de price
  ordersCount: number; // cantidad de órdenes
  itemsCount: number; // cantidad de ítems
}

export interface CategoryConsumptionData {
  categories: CategoryConsumption[];
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const buildUrl = (path: string) => {
  if (!BASE_URL) return undefined;
  return `${BASE_URL}${path}`;
};

export const fetchTimeSeriesSales = async (
  groupBy: "month" | "day",
): Promise<TimeSeriesChartData> => {
  const url = buildUrl(`/api/time-series/sales?groupBy=${groupBy}`);

  if (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Time series request failed with status ${response.status}`);
      }

      const payload = await response.json();
      if (!payload?.series) {
        throw new Error("Time series payload is missing 'series'");
      }

      return payload as TimeSeriesChartData;
    } catch (error) {
      console.error("Falling back to mock time series data due to error", error);
    }
  }

  return mockTimeSeriesChartData;
};

export const fetchCategoryConsumption = async (): Promise<CategoryConsumptionData> => {
  const url = buildUrl("/api/consumption/categories");

  if (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Category consumption request failed with status ${response.status}`);
      }

      const payload = await response.json();
      if (!payload?.categories) {
        throw new Error("Category consumption payload is missing 'categories'");
      }

      return payload as CategoryConsumptionData;
    } catch (error) {
      console.error("Falling back to mock category consumption data due to error", error);
    }
  }

  return mockCategoryConsumptionData;
};
