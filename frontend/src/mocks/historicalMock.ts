import type {
  CategoryConsumptionData,
  TimeSeriesChartData,
} from "@/services/historicalService";

export const mockTimeSeriesChartData: TimeSeriesChartData = {
  series: [
    {
      label: "Total ventas",
      points: [
        { date: "2017-01", value: 10500 },
        { date: "2017-02", value: 11250 },
        { date: "2017-03", value: 11890 },
        { date: "2017-04", value: 12340 },
        { date: "2017-05", value: 13100 },
        { date: "2017-06", value: 13850 },
        { date: "2017-07", value: 14200 },
        { date: "2017-08", value: 14920 },
        { date: "2017-09", value: 15510 },
        { date: "2017-10", value: 16200 },
        { date: "2017-11", value: 16850 },
        { date: "2017-12", value: 17600 },
        { date: "2018-01", value: 18250 },
        { date: "2018-02", value: 18900 },
        { date: "2018-03", value: 19480 },
        { date: "2018-04", value: 20120 },
        { date: "2018-05", value: 20950 },
        { date: "2018-06", value: 21840 },
        { date: "2018-07", value: 22500 },
        { date: "2018-08", value: 23250 },
        { date: "2018-09", value: 24100 },
        { date: "2018-10", value: 24950 },
        { date: "2018-11", value: 25800 },
        { date: "2018-12", value: 26650 },
      ],
    },
  ],
};

export const mockCategoryConsumptionData: CategoryConsumptionData = {
  categories: [
    { category: "artes", totalSales: 250000.5, ordersCount: 1234, itemsCount: 1600 },
    { category: "beleza_saude", totalSales: 180000.0, ordersCount: 900, itemsCount: 1100 },
    { category: "moveis_decoracao", totalSales: 220500.75, ordersCount: 1100, itemsCount: 1450 },
    { category: "informatica_acessorios", totalSales: 265000.25, ordersCount: 1500, itemsCount: 2000 },
    { category: "fashion_bolsas_e_acessorios", totalSales: 145000.0, ordersCount: 800, itemsCount: 1050 },
    { category: "bebes", totalSales: 135500.0, ordersCount: 720, itemsCount: 950 },
    { category: "telefonia", totalSales: 310000.0, ordersCount: 1650, itemsCount: 2100 },
    { category: "casa_construcao", totalSales: 195000.0, ordersCount: 970, itemsCount: 1200 },
    { category: "brinquedos", totalSales: 160000.0, ordersCount: 840, itemsCount: 1140 },
    { category: "esporte_lazer", totalSales: 175000.0, ordersCount: 910, itemsCount: 1180 },
    { category: "papelaria", totalSales: 98000.0, ordersCount: 560, itemsCount: 760 },
    { category: "pet_shop", totalSales: 102500.0, ordersCount: 590, itemsCount: 800 },
  ],
};
