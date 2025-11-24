import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

import type { TimeSeriesChartData } from "@/services/historicalService";

interface TimeSeriesChartProps {
  data: TimeSeriesChartData;
  height?: number;
}

const TimeSeriesChart = ({ data, height = 360 }: TimeSeriesChartProps) => {
  const option = useMemo(() => {
    const xAxisValues = Array.from(
      new Set(
        data.series.flatMap((serie) => serie.points.map((point) => point.date)),
      ),
    ).sort();

    const series = data.series.map((serie) => ({
      name: serie.label,
      type: "line",
      smooth: true,
      showSymbol: false,
      connectNulls: true,
      data: xAxisValues.map((date) => {
        const matchingPoint = serie.points.find((point) => point.date === date);
        return matchingPoint?.value ?? null;
      }),
      emphasis: {
        focus: "series",
      },
      lineStyle: {
        width: 3,
      },
    }));

    return {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: data.series.map((serie) => serie.label),
        top: 0,
        textStyle: { color: "hsl(var(--foreground))" },
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisValues,
        axisLine: { lineStyle: { color: "hsl(var(--border))" } },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "hsl(var(--border))" } },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
        splitLine: { lineStyle: { color: "hsl(var(--border))" } },
      },
      series,
    };
  }, [data]);

  return <ReactECharts option={option} style={{ height }} />;
};

export default TimeSeriesChart;
