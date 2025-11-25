import type {
  CustomerHeatmapData,
  CustomerSellerMapData,
} from "@/services/mapService";

const baseHeatmapPoints = [
  { lat: -23.55, lon: -46.63, weight: 9 },
  { lat: -22.9, lon: -43.17, weight: 7 },
  { lat: -15.8, lon: -47.86, weight: 6 },
  { lat: -12.97, lon: -38.5, weight: 5 },
  { lat: -3.73, lon: -38.52, weight: 4 },
  { lat: -19.92, lon: -43.94, weight: 5 },
  { lat: -3.13, lon: -60.02, weight: 4 },
  { lat: -25.43, lon: -49.27, weight: 6 },
  { lat: -8.05, lon: -34.88, weight: 5 },
  { lat: -30.03, lon: -51.23, weight: 5 },
  { lat: -16.68, lon: -49.25, weight: 4 },
  { lat: -1.46, lon: -48.49, weight: 3 },
  { lat: -22.9, lon: -47.06, weight: 4 },
  { lat: -20.31, lon: -40.33, weight: 4 },
];

const heatmapOffsets = [0, 0.06, -0.06, 0.12, -0.12];

export const customerHeatmapMock: CustomerHeatmapData = {
  points: baseHeatmapPoints.flatMap((point, index) =>
    heatmapOffsets.map((offset, offsetIndex) => ({
      lat: point.lat + offset,
      lon: point.lon + offset * 0.6,
      weight: Math.max(1, point.weight - offsetIndex + (index % 3)),
    })),
  ),
};

const baseCustomerPoints = [
  { lat: -23.55, lon: -46.63 },
  { lat: -22.9, lon: -43.17 },
  { lat: -15.8, lon: -47.86 },
  { lat: -12.97, lon: -38.5 },
  { lat: -3.73, lon: -38.52 },
  { lat: -19.92, lon: -43.94 },
  { lat: -3.13, lon: -60.02 },
  { lat: -25.43, lon: -49.27 },
  { lat: -8.05, lon: -34.88 },
  { lat: -30.03, lon: -51.23 },
  { lat: -16.68, lon: -49.25 },
  { lat: -1.46, lon: -48.49 },
  { lat: -22.9, lon: -47.06 },
  { lat: -20.31, lon: -40.33 },
  { lat: -10.19, lon: -48.33 },
  { lat: -2.53, lon: -44.3 },
  { lat: -9.97, lon: -67.81 },
];

const pointOffsets = [0, 0.08, -0.08, 0.16];

const buildExpandedPoints = (points: typeof baseCustomerPoints, offsetMultiplier: number) =>
  points.flatMap((point, index) =>
    pointOffsets
      .slice(0, (index % 2 === 0 ? pointOffsets.length : pointOffsets.length - 1))
      .map((offset, offsetIndex) => ({
        lat: point.lat + offset,
        lon: point.lon + offset * offsetMultiplier,
        weight: undefined,
        offsetIndex,
      })),
  );

const expandedCustomers = buildExpandedPoints(baseCustomerPoints, 0.75).slice(0, 58);
const expandedSellers = buildExpandedPoints(baseCustomerPoints.slice().reverse(), 0.65).slice(0, 52);

export const customerSellerMapMock: CustomerSellerMapData = {
  customers: expandedCustomers.map(({ lat, lon }) => ({ lat, lon })),
  sellers: expandedSellers.map(({ lat, lon }) => ({ lat, lon })),
};
