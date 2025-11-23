import type { AlgorithmType, PredictiveWarehouse } from "@/services/predictiveTypes";

const baseItems = [
  "3713f19c71c4be21ced80738e2fa49bc",
  "99a4788cb24856965c36a24e339b6058",
  "7a5df623713bbcb94a51ea4540748c12",
  "9d9734db712d5ab6c3ff4c33700eb34c",
  "a49969155f3a64afc931fd281444b2b6",
  "1c5b6c76d5a7435ea8b2ad0c3bc70e01",
  "6c4291c25c0a4b88b48205f7f278f538",
  "e94f0f1ba7024ab3b7fc6d6f629b4c9f",
];

const seededRandom = (seed: number) => {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};

const pickItem = (rand: () => number) => baseItems[Math.floor(rand() * baseItems.length)];

const pickSize = (rand: () => number): PredictiveWarehouse["warehouse_size"] => {
  const sizes: PredictiveWarehouse["warehouse_size"][] = ["small", "medium", "large"];
  return sizes[Math.floor(rand() * sizes.length)];
};

const anchorCities = [
  { name: "São Paulo", latitude: -23.55052, longitude: -46.633308 },
  { name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729 },
  { name: "Brasilia", latitude: -15.77972, longitude: -47.92972 },
  { name: "Recife", latitude: -8.0475622, longitude: -34.8769644 },
  { name: "Porto Alegre", latitude: -30.033056, longitude: -51.23 },
  { name: "Manaus", latitude: -3.1190275, longitude: -60.0217314 },
  { name: "Salvador", latitude: -12.9704, longitude: -38.5124 },
  { name: "Curitiba", latitude: -25.4284, longitude: -49.2733 },
  { name: "Goiania", latitude: -16.6869, longitude: -49.2648 },
  { name: "Belo Horizonte", latitude: -19.9167, longitude: -43.9345 },
];

const buildGrowth = (rand: () => number, base: number) => {
  const estimated_customer_growth_1y = Math.round(base + rand() * 4000 + 500);
  const estimated_customer_growth_2y = Math.round(estimated_customer_growth_1y * (1.3 + rand() * 0.5));
  return { estimated_customer_growth_1y, estimated_customer_growth_2y };
};

const createWarehouse = (
  rand: () => number,
  algorithm: AlgorithmType,
  warehouse_id: number,
  anchorIndex: number,
  baseCustomerCount: number,
  note: string,
): PredictiveWarehouse => {
  const anchor = anchorCities[anchorIndex % anchorCities.length];
  const latitude = anchor.latitude + (rand() - 0.5) * 1.6;
  const longitude = anchor.longitude + (rand() - 0.5) * 1.6;
  const customer_count = Math.max(320, Math.round(baseCustomerCount * (0.75 + rand() * 0.6)));
  const density_ratio = parseFloat((0.004 + rand() * 0.015).toFixed(4));
  const estimated_delivery_improvement_pct = parseFloat((6 + rand() * 12).toFixed(2));
  const { estimated_customer_growth_1y, estimated_customer_growth_2y } = buildGrowth(rand, customer_count);

  return {
    warehouse_id,
    latitude,
    longitude,
    customer_count,
    density_ratio,
    warehouse_size: pickSize(rand),
    estimated_delivery_improvement_pct,
    top_items: [pickItem(rand), pickItem(rand), pickItem(rand)],
    algorithm,
    note,
    estimated_customer_growth_1y,
    estimated_customer_growth_2y,
  };
};

const baseWarehouses: PredictiveWarehouse[] = [
  {
    warehouse_id: 0,
    latitude: -22.63847482067538,
    longitude: -42.03269986663262,
    customer_count: 1013,
    density_ratio: 0.0102,
    warehouse_size: "small",
    estimated_delivery_improvement_pct: 11.53,
    top_items: [
      "3713f19c71c4be21ced80738e2fa49bc",
      "99a4788cb24856965c36a24e339b6058",
      "7a5df623713bbcb94a51ea4540748c12",
      "9d9734db712d5ab6c3ff4c33700eb34c",
      "a49969155f3a64afc931fd281444b2b6",
    ],
    algorithm: "gmm",
    note: "Cluster normal",
    estimated_customer_growth_1y: 1374,
    estimated_customer_growth_2y: 1864,
  },
  {
    warehouse_id: 1,
    latitude: -23.55052,
    longitude: -46.633308,
    customer_count: 1820,
    algorithm: "kmeans",
    note: "Centro urbano",
    density_ratio: 0.0141,
    warehouse_size: "large",
    estimated_delivery_improvement_pct: 14.2,
    top_items: [
      "7a5df623713bbcb94a51ea4540748c12",
      "6c4291c25c0a4b88b48205f7f278f538",
      "1c5b6c76d5a7435ea8b2ad0c3bc70e01",
    ],
    estimated_customer_growth_1y: 3240,
    estimated_customer_growth_2y: 4550,
  },
  {
    warehouse_id: 2,
    latitude: -3.1190275,
    longitude: -60.0217314,
    customer_count: 760,
    algorithm: "minibatchkmeans",
    note: "Zona norte",
    density_ratio: 0.0084,
    warehouse_size: "medium",
    estimated_delivery_improvement_pct: 9.7,
    top_items: [
      "99a4788cb24856965c36a24e339b6058",
      "e94f0f1ba7024ab3b7fc6d6f629b4c9f",
      "3713f19c71c4be21ced80738e2fa49bc",
    ],
    estimated_customer_growth_1y: 1480,
    estimated_customer_growth_2y: 2143,
  },
  {
    warehouse_id: 3,
    latitude: -12.9704,
    longitude: -38.5124,
    customer_count: 940,
    algorithm: "kmeans",
    note: "Costa noreste",
    density_ratio: 0.0091,
    warehouse_size: "medium",
    estimated_delivery_improvement_pct: 10.8,
    top_items: [
      "a49969155f3a64afc931fd281444b2b6",
      "6c4291c25c0a4b88b48205f7f278f538",
      "e94f0f1ba7024ab3b7fc6d6f629b4c9f",
    ],
    estimated_customer_growth_1y: 1762,
    estimated_customer_growth_2y: 2451,
  },
  {
    warehouse_id: 4,
    latitude: -8.0475622,
    longitude: -34.8769644,
    customer_count: 640,
    algorithm: "minibatchkmeans",
    note: "Corredor costero",
    density_ratio: 0.0078,
    warehouse_size: "small",
    estimated_delivery_improvement_pct: 8.9,
    top_items: [
      "7a5df623713bbcb94a51ea4540748c12",
      "1c5b6c76d5a7435ea8b2ad0c3bc70e01",
      "9d9734db712d5ab6c3ff4c33700eb34c",
    ],
    estimated_customer_growth_1y: 1255,
    estimated_customer_growth_2y: 1830,
  },
  {
    warehouse_id: 5,
    latitude: -15.77972,
    longitude: -47.92972,
    customer_count: 1350,
    algorithm: "gmm",
    note: "Centro logístico federal",
    density_ratio: 0.011,
    warehouse_size: "large",
    estimated_delivery_improvement_pct: 12.35,
    top_items: [
      "3713f19c71c4be21ced80738e2fa49bc",
      "99a4788cb24856965c36a24e339b6058",
      "6c4291c25c0a4b88b48205f7f278f538",
    ],
    estimated_customer_growth_1y: 2650,
    estimated_customer_growth_2y: 3661,
  },
  {
    warehouse_id: 6,
    latitude: -30.033056,
    longitude: -51.23,
    customer_count: 520,
    algorithm: "kmeans",
    note: "Extremo sur",
    density_ratio: 0.0061,
    warehouse_size: "small",
    estimated_delivery_improvement_pct: 7.75,
    top_items: [
      "e94f0f1ba7024ab3b7fc6d6f629b4c9f",
      "9d9734db712d5ab6c3ff4c33700eb34c",
      "99a4788cb24856965c36a24e339b6058",
    ],
    estimated_customer_growth_1y: 1012,
    estimated_customer_growth_2y: 1498,
  },
  {
    warehouse_id: 7,
    latitude: -16.6869,
    longitude: -49.2648,
    customer_count: 480,
    algorithm: "gmm",
    note: "Crecimiento periférico",
    density_ratio: 0.0068,
    warehouse_size: "medium",
    estimated_delivery_improvement_pct: 9.05,
    top_items: [
      "7a5df623713bbcb94a51ea4540748c12",
      "a49969155f3a64afc931fd281444b2b6",
      "1c5b6c76d5a7435ea8b2ad0c3bc70e01",
    ],
    estimated_customer_growth_1y: 978,
    estimated_customer_growth_2y: 1422,
  },
  {
    warehouse_id: 8,
    latitude: -22.9068,
    longitude: -43.1729,
    customer_count: 2100,
    algorithm: "minibatchkmeans",
    note: "Corredor sudeste",
    density_ratio: 0.0152,
    warehouse_size: "large",
    estimated_delivery_improvement_pct: 16.1,
    top_items: [
      "99a4788cb24856965c36a24e339b6058",
      "e94f0f1ba7024ab3b7fc6d6f629b4c9f",
      "6c4291c25c0a4b88b48205f7f278f538",
    ],
    estimated_customer_growth_1y: 3820,
    estimated_customer_growth_2y: 5385,
  },
  {
    warehouse_id: 9,
    latitude: -19.9167,
    longitude: -43.9345,
    customer_count: 870,
    algorithm: "kmeans",
    note: "Región minera",
    density_ratio: 0.0089,
    warehouse_size: "medium",
    estimated_delivery_improvement_pct: 9.45,
    top_items: [
      "3713f19c71c4be21ced80738e2fa49bc",
      "7a5df623713bbcb94a51ea4540748c12",
      "a49969155f3a64afc931fd281444b2b6",
    ],
    estimated_customer_growth_1y: 1632,
    estimated_customer_growth_2y: 2308,
  },
  {
    warehouse_id: 10,
    latitude: -2.533,
    longitude: -44.3028,
    customer_count: 420,
    algorithm: "gmm",
    note: "Frontera amazónica",
    density_ratio: 0.0064,
    warehouse_size: "small",
    estimated_delivery_improvement_pct: 8.15,
    top_items: [
      "9d9734db712d5ab6c3ff4c33700eb34c",
      "e94f0f1ba7024ab3b7fc6d6f629b4c9f",
      "1c5b6c76d5a7435ea8b2ad0c3bc70e01",
    ],
    estimated_customer_growth_1y: 910,
    estimated_customer_growth_2y: 1358,
  },
  {
    warehouse_id: 11,
    latitude: -25.4284,
    longitude: -49.2733,
    customer_count: 690,
    algorithm: "minibatchkmeans",
    note: "Eje sur",
    density_ratio: 0.0073,
    warehouse_size: "medium",
    estimated_delivery_improvement_pct: 8.95,
    top_items: [
      "a49969155f3a64afc931fd281444b2b6",
      "6c4291c25c0a4b88b48205f7f278f538",
      "7a5df623713bbcb94a51ea4540748c12",
    ],
    estimated_customer_growth_1y: 1325,
    estimated_customer_growth_2y: 1901,
  },
];

const extraCounts: Record<AlgorithmType, number> = {
  gmm: 29,
  kmeans: 30,
  minibatchkmeans: 18,
};

const generatedWarehouses: PredictiveWarehouse[] = Object.entries(extraCounts).flatMap(
  ([algorithm, count], algorithmIndex) => {
    const rand = seededRandom(1234 + algorithmIndex * 99);
    const baseId = baseWarehouses.length +
      Object.entries(extraCounts)
        .slice(0, algorithmIndex)
        .reduce((acc, [, value]) => acc + value, 0);

    return Array.from({ length: count }, (_, index) =>
      createWarehouse(
        rand,
        algorithm as AlgorithmType,
        baseId + index,
        (index + algorithmIndex) % anchorCities.length,
        700 + index * 8 + algorithmIndex * 15,
        `Expansión automatizada ${algorithm.toUpperCase()} #${index + 1}`,
      ),
    );
  },
);

export const warehouseLocations: PredictiveWarehouse[] = [...baseWarehouses, ...generatedWarehouses];

export const algorithmOrder: AlgorithmType[] = ["gmm", "kmeans", "minibatchkmeans"];
