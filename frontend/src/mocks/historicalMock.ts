import type {
  CategoryConsumptionData,
  TimeSeriesChartData,
} from "@/services/historicalService";

import consumoXcategoria from '@/mocks/CONSUMO_POR_CATEGORIA.json';
import ventas from '@/mocks/LINEA_DE_BARRAS.json'

export const mockTimeSeriesChartData: TimeSeriesChartData = {
  series: ventas.series
};

export const mockCategoryConsumptionData: CategoryConsumptionData = {
  categories: consumoXcategoria.categories,
};
