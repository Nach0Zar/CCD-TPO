export type AlgorithmType = "MinibatchKMeans" | "KMeans" | "GMM";

export interface WarehouseLocation {
  warehouse_id: number;
  latitude: number;
  longitude: number;
  customer_count: number;
  algorithm: AlgorithmType;
  note?: string;
}

export const warehouseLocations: WarehouseLocation[] = [
  {
    warehouse_id: 0,
    latitude: -22.63847482067538,
    longitude: -42.03269986663262,
    customer_count: 1013,
    algorithm: "GMM",
    note: "Cluster normal",
  },
  {
    warehouse_id: 1,
    latitude: -23.55052,
    longitude: -46.633308,
    customer_count: 1820,
    algorithm: "KMeans",
    note: "Centro urbano",
  },
  {
    warehouse_id: 2,
    latitude: -3.1190275,
    longitude: -60.0217314,
    customer_count: 760,
    algorithm: "MinibatchKMeans",
    note: "Zona norte",
  },
  {
    warehouse_id: 3,
    latitude: -12.9704,
    longitude: -38.5124,
    customer_count: 940,
    algorithm: "KMeans",
  },
  {
    warehouse_id: 4,
    latitude: -8.0475622,
    longitude: -34.8769644,
    customer_count: 640,
    algorithm: "MinibatchKMeans",
  },
  {
    warehouse_id: 5,
    latitude: -15.77972,
    longitude: -47.92972,
    customer_count: 1350,
    algorithm: "GMM",
  },
  {
    warehouse_id: 6,
    latitude: -30.033056,
    longitude: -51.23,
    customer_count: 520,
    algorithm: "KMeans",
  },
  {
    warehouse_id: 7,
    latitude: -16.6869,
    longitude: -49.2648,
    customer_count: 480,
    algorithm: "GMM",
  },
  {
    warehouse_id: 8,
    latitude: -22.9068,
    longitude: -43.1729,
    customer_count: 2100,
    algorithm: "MinibatchKMeans",
  },
  {
    warehouse_id: 9,
    latitude: -19.9167,
    longitude: -43.9345,
    customer_count: 870,
    algorithm: "KMeans",
  },
  {
    warehouse_id: 10,
    latitude: -2.533,
    longitude: -44.3028,
    customer_count: 420,
    algorithm: "GMM",
  },
  {
    warehouse_id: 11,
    latitude: -25.4284,
    longitude: -49.2733,
    customer_count: 690,
    algorithm: "MinibatchKMeans",
  },
];
