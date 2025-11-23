export type AlgorithmType = "gmm" | "kmeans" | "minibatchkmeans";

export interface PredictiveWarehouse {
  warehouse_id: number;
  latitude: number;
  longitude: number;
  customer_count: number;
  algorithm: AlgorithmType;
  note?: string;
  density_ratio?: number;
  warehouse_size?: string;
  estimated_delivery_improvement_pct?: number;
  top_items?: string[];
  estimated_customer_growth_1y?: number;
  estimated_customer_growth_2y?: number;
}
