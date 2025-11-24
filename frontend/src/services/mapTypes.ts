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
