import {
  mockMacroCorrelationInflation,
  mockMacroCorrelationInterestRate,
  mockMacroCorrelationUsdBrl,
  mockStateConsumptionData,
} from "@/mocks/geoEconomicMock";

export interface StateConsumption {
  state: string; // "SP", "RJ", etc.
  totalSales: number; // suma de ventas
  ordersCount: number; // número de órdenes
}

export interface StateConsumptionData {
  states: StateConsumption[];
}

export interface MacroCorrelationPoint {
  date: string; // "2017-01"
  indicatorValue: number; // ej: inflación
  salesValue: number; // ventas en ese período
}

export interface MacroCorrelationData {
  indicator: string; // "inflation", "usd_brl", etc.
  unit: string; // "%", "BRL", etc.
  points: MacroCorrelationPoint[];
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const buildUrl = (path: string) => {
  if (!BASE_URL) return undefined;
  return `${BASE_URL}${path}`;
};

const macroMockByIndicator: Record<string, MacroCorrelationData> = {
  inflation: mockMacroCorrelationInflation,
  usd_brl: mockMacroCorrelationUsdBrl,
  interest_rate: mockMacroCorrelationInterestRate,
};

export const fetchStateConsumption = async (): Promise<StateConsumptionData> => {
  const url = buildUrl("/api/consumption/states");

  if (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`State consumption request failed with status ${response.status}`);
      }

      const payload = await response.json();
      if (!payload?.states) {
        throw new Error("State consumption payload is missing 'states'");
      }

      return payload as StateConsumptionData;
    } catch (error) {
      console.error("Falling back to mock state consumption data due to error", error);
    }
  }

  return mockStateConsumptionData;
};

export const fetchMacroCorrelation = async (
  indicator: string,
): Promise<MacroCorrelationData> => {
  const url = buildUrl(`/api/correlation?indicator=${indicator}`);

  if (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Macro correlation request failed with status ${response.status}`);
      }

      const payload = await response.json();
      if (!payload?.points) {
        throw new Error("Macro correlation payload is missing 'points'");
      }

      return payload as MacroCorrelationData;
    } catch (error) {
      console.error("Falling back to mock macro correlation data due to error", error);
    }
  }

  return macroMockByIndicator[indicator] ?? mockMacroCorrelationInflation;
};
