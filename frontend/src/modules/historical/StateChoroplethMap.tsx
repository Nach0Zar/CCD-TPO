import { useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

import brazilGeoJson from "@/data/brazil_geo.json";
import type { StateConsumptionData } from "@/services/geoEconomicService";

interface StateChoroplethMapProps {
  data: StateConsumptionData;
  height?: number;
}

type MapTooltipParams = echarts.CallbackDataParams & {
  data?: {
    stateCode?: string;
    value?: number;
    ordersCount?: number;
  };
};

const stateNameByCode: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

const StateChoroplethMap = ({ data, height = 420 }: StateChoroplethMapProps) => {
  useEffect(() => {
    if (!echarts.getMap("brazil")) {
      echarts.registerMap("brazil", brazilGeoJson as echarts.GeoJSONSourceInput);
    }
  }, []);

  const option = useMemo(() => {
    const mappedStates = data.states.map((state) => ({
      name: stateNameByCode[state.state] ?? state.state,
      value: state.totalSales,
      stateCode: state.state,
      ordersCount: state.ordersCount,
    }));

    const salesValues = mappedStates.map((state) => state.value);
    const minSales = salesValues.length ? Math.min(...salesValues) : 0;
    const maxSales = salesValues.length ? Math.max(...salesValues) : 0;

    return {
      tooltip: {
        trigger: "item",
        formatter: (params: MapTooltipParams) => {
          if (!params?.data) return "Sin datos";
          const { stateCode, value, ordersCount } = params.data;
          const formattedSales = Number(value ?? 0).toLocaleString("es-AR", {
            maximumFractionDigits: 0,
          });
          const formattedOrders = Number(ordersCount ?? 0).toLocaleString("es-AR");
          return `<div><strong>${stateCode ?? params.name}</strong><br/>Ventas: ${formattedSales}<br/>Órdenes: ${formattedOrders}</div>`;
        },
      },
      visualMap: {
        show: Boolean(mappedStates.length),
        min: minSales,
        max: maxSales,
        left: "left",
        bottom: 12,
        calculable: true,
        inRange: {
          color: ["#e0f2fe", "#0284c7"],
        },
        text: ["Mayor consumo", "Menor consumo"],
        textStyle: {
          color: "hsl(var(--muted-foreground))",
        },
      },
      series: [
        {
          name: "Consumo por estado",
          type: "map",
          map: "brazil",
          roam: true,
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: "hsl(var(--muted-foreground)/0.1)",
            },
          },
          itemStyle: {
            borderColor: "hsl(var(--border))",
            borderWidth: 1,
          },
          data: mappedStates,
        },
      ],
    } as echarts.EChartsOption;
  }, [data.states]);

  return <ReactECharts option={option} lazyUpdate notMerge style={{ height, width: "100%" }} />;
};

export default StateChoroplethMap;
