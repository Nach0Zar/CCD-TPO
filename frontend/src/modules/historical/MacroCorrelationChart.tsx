import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

import type { MacroCorrelationData } from "@/services/geoEconomicService";

interface MacroCorrelationChartProps {
  data: MacroCorrelationData;
  height?: number;
}

const indicatorLabels: Record<string, string> = {
  inflation: "Inflación",
  usd_brl: "USD/BRL",
  interest_rate: "Tasa de interés",
};

type TooltipParams = echarts.CallbackDataParams | echarts.CallbackDataParams[];

const MacroCorrelationChart = ({ data, height = 420 }: MacroCorrelationChartProps) => {
  const option = useMemo(() => {
    const dates = data.points.map((point) => point.date);
    const indicatorSeries = data.points.map((point) => point.indicatorValue);
    const salesSeries = data.points.map((point) => point.salesValue);

    const indicatorLabel = indicatorLabels[data.indicator] ?? data.indicator;

    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: TooltipParams) => {
          if (!Array.isArray(params)) return "";
          const indicatorPoint = params.find((point) => point.seriesIndex === 0) ?? params[0];
          const salesPoint = params.find((point) => point.seriesIndex === 1) ?? params[1];

          const indicatorValue = Number(indicatorPoint?.data ?? 0).toLocaleString("es-AR", {
            maximumFractionDigits: 2,
          });
          const salesValue = Number(salesPoint?.data ?? 0).toLocaleString("es-AR", {
            maximumFractionDigits: 0,
          });

          return `<div><strong>${indicatorPoint?.axisValue ?? ""}</strong><br/>${indicatorLabel}: ${indicatorValue}${data.unit ? ` ${data.unit}` : ""}<br/>Ventas: ${salesValue}</div>`;
        },
      },
      legend: {
        data: [indicatorLabel, "Ventas"],
        top: 0,
        textStyle: { color: "hsl(var(--foreground))" },
      },
      grid: { left: "4%", right: "4%", bottom: "8%", containLabel: true },
      xAxis: {
        type: "category",
        data: dates,
        axisLabel: { color: "hsl(var(--muted-foreground))" },
        axisLine: { lineStyle: { color: "hsl(var(--border))" } },
      },
      yAxis: [
        {
          type: "value",
          name: data.unit ? `${indicatorLabel} (${data.unit})` : indicatorLabel,
          axisLabel: { color: "hsl(var(--muted-foreground))" },
          axisLine: { lineStyle: { color: "#94a3b8" } },
          splitLine: { lineStyle: { color: "hsl(var(--border))" } },
        },
        {
          type: "value",
          name: "Ventas",
          axisLabel: {
            formatter: (value: number) => value.toLocaleString("es-AR", { maximumFractionDigits: 0 }),
            color: "hsl(var(--muted-foreground))",
          },
          axisLine: { lineStyle: { color: "#14b8a6" } },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: indicatorLabel,
          type: "line",
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          data: indicatorSeries,
          lineStyle: { width: 3 },
        },
        {
          name: "Ventas",
          type: "line",
          smooth: true,
          yAxisIndex: 1,
          showSymbol: false,
          data: salesSeries,
          lineStyle: { width: 3 },
          areaStyle: {
            opacity: 0.08,
          },
        },
      ],
    } as echarts.EChartsOption;
  }, [data]);

  return <ReactECharts option={option} lazyUpdate notMerge style={{ height, width: "100%" }} />;
};

export default MacroCorrelationChart;
