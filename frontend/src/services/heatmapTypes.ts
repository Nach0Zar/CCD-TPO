export interface CustomerHeatmapPoint {
  lat: number;
  lon: number;
  weight: number;
}

export interface CustomerHeatmapData {
  points: CustomerHeatmapPoint[];
}
