import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

import type { CategoryConsumptionData } from "@/services/historicalService";

interface CategoryBarsChartProps {
  data: CategoryConsumptionData;
  height?: number;
}

const CategoryBarsChart = ({ data, height = 360 }: CategoryBarsChartProps) => {
  const option = useMemo(() => {
    const sorted = [...data.categories].sort(
      (a, b) => b.totalSales - a.totalSales,
    );

    const resolveIndex = (params: unknown): number | undefined => {
      if (Array.isArray(params)) {
        const first = params[0] as { dataIndex?: number };
        return typeof first?.dataIndex === "number" ? first.dataIndex : undefined;
      }

      if (params && typeof params === "object" && "dataIndex" in params) {
        const { dataIndex } = params as { dataIndex?: number };
        return typeof dataIndex === "number" ? dataIndex : undefined;
      }

      return undefined;
    };

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params: unknown) => {
          const dataIndex = resolveIndex(params);
          const category = typeof dataIndex === "number" ? sorted[dataIndex] : null;
          if (!category) return "";

          return `
            <div>
              <div><strong>${category.category}</strong></div>
              <div>Ventas: ${category.totalSales.toLocaleString()}</div>
              <div>Órdenes: ${category.ordersCount.toLocaleString()}</div>
              <div>Ítems: ${category.itemsCount.toLocaleString()}</div>
            </div>
          `;
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "hsl(var(--border))" } },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
        splitLine: { lineStyle: { color: "hsl(var(--border))" } },
      },
      yAxis: {
        type: "category",
        data: sorted.map((category) => category.category),
        axisLine: { lineStyle: { color: "hsl(var(--border))" } },
        axisLabel: { color: "hsl(var(--muted-foreground))" },
      },
      series: [
        {
          type: "bar",
          data: sorted.map((category) => ({
            value: category.totalSales,
          })),
          itemStyle: {
            color: "hsl(var(--chart-1))",
          },
          barWidth: "60%",
        },
      ],
    };
  }, [data.categories]);

  return <ReactECharts option={option} style={{ height }} />;
};

export default CategoryBarsChart;
