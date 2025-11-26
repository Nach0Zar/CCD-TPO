import type { MacroCorrelationData, StateConsumptionData } from "@/services/geoEconomicService";

import correlation from '@/mocks/Correlograma_con_indicadores_economic.json'
import cosumoXestado from '@/mocks/CONSUMO_POR_ESTADO.json'

export const mockStateConsumptionData: StateConsumptionData = {
  states: cosumoXestado.states,
};

export const mockMacroCorrelationInflation: MacroCorrelationData = {
  indicator: "inflation",
  unit: "%",
  points: correlation.points,
};

export const mockMacroCorrelationUsdBrl: MacroCorrelationData = {
  indicator: "usd_brl",
  unit: "BRL",
  points: [
    { date: "2023-01", indicatorValue: 5.21, salesValue: 148000 },
    { date: "2023-02", indicatorValue: 5.18, salesValue: 149500 },
    { date: "2023-03", indicatorValue: 5.09, salesValue: 153000 },
    { date: "2023-04", indicatorValue: 5.02, salesValue: 156500 },
    { date: "2023-05", indicatorValue: 4.98, salesValue: 159000 },
    { date: "2023-06", indicatorValue: 4.95, salesValue: 161500 },
    { date: "2023-07", indicatorValue: 4.96, salesValue: 160000 },
    { date: "2023-08", indicatorValue: 5.05, salesValue: 157500 },
    { date: "2023-09", indicatorValue: 5.12, salesValue: 155000 },
    { date: "2023-10", indicatorValue: 5.18, salesValue: 153500 },
    { date: "2023-11", indicatorValue: 5.23, salesValue: 152000 },
    { date: "2023-12", indicatorValue: 5.26, salesValue: 151500 },
  ],
};

export const mockMacroCorrelationInterestRate: MacroCorrelationData = {
  indicator: "interest_rate",
  unit: "%",
  points: [
    { date: "2023-01", indicatorValue: 13.75, salesValue: 142000 },
    { date: "2023-02", indicatorValue: 13.75, salesValue: 141500 },
    { date: "2023-03", indicatorValue: 13.75, salesValue: 143000 },
    { date: "2023-04", indicatorValue: 13.2, salesValue: 146500 },
    { date: "2023-05", indicatorValue: 12.65, salesValue: 150000 },
    { date: "2023-06", indicatorValue: 12.15, salesValue: 153000 },
    { date: "2023-07", indicatorValue: 11.65, salesValue: 155500 },
    { date: "2023-08", indicatorValue: 11.15, salesValue: 158500 },
    { date: "2023-09", indicatorValue: 10.65, salesValue: 160500 },
    { date: "2023-10", indicatorValue: 10.15, salesValue: 163000 },
    { date: "2023-11", indicatorValue: 9.65, salesValue: 166000 },
    { date: "2023-12", indicatorValue: 9.15, salesValue: 168500 },
  ],
};
