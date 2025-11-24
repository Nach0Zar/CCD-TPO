export interface MapPoint {
  lat: number;
  lon: number;
}

export interface CustomerSellerMapData {
  customers: MapPoint[];
  sellers: MapPoint[];
}
