import { useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Loader2, Map } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import brazilGeoJson from "@/data/brazil_geo.json";
import { fetchCustomerHeatmap } from "@/services/heatmapService";
import type { CustomerHeatmapData } from "@/services/heatmapTypes";

const HistoricConsumption = () => {
  const {
    data: heatmapData,
    isLoading: isHeatmapLoading,
    isError: isHeatmapError,
  } = useQuery<CustomerHeatmapData>({
    queryKey: ["customer-heatmap"],
    queryFn: fetchCustomerHeatmap,
  });

  useEffect(() => {
    if (!echarts.getMap("brazil")) {
      echarts.registerMap("brazil", brazilGeoJson);
    }
  }, []);

  const totalHeatmapCustomers = useMemo(
    () => heatmapData?.points.reduce((total, point) => total + point.weight, 0) ?? 0,
    [heatmapData],
  );

  type HeatmapFormatterParams = { value?: [number, number, number] };

  const heatmapOption = useMemo<echarts.EChartsOption | null>(() => {
    if (!heatmapData?.points.length) return null;

    const maxWeight = Math.max(...heatmapData.points.map((point) => point.weight));

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        borderColor: "hsl(var(--border))",
        formatter: (params: HeatmapFormatterParams) => {
          const [lon, lat, value] = params.value || [];
          return `
            <div style="min-width:180px;">
              <div style="font-weight:600;margin-bottom:6px;">Zona con clientes</div>
              <div style="font-size:12px;line-height:1.5;">
                <div>Lat: ${lat?.toFixed?.(2) ?? lat}</div>
                <div>Lon: ${lon?.toFixed?.(2) ?? lon}</div>
                <div>Clientes estimados: ${value}</div>
              </div>
            </div>
          `;
        },
      },
      visualMap: {
        min: 0,
        max: maxWeight || 10,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 18,
        text: ["Mayor densidad", "Menor"],
        textStyle: { color: "hsl(var(--muted-foreground))" },
        inRange: {
          color: ["#e0f2fe", "#38bdf8", "#0ea5e9", "#0369a1"],
        },
        itemWidth: 12,
        itemHeight: 160,
      },
      geo: {
        map: "brazil",
        roam: true,
        zoom: 0.95,
        itemStyle: {
          areaColor: "lightyellow",
          borderColor: "hsl(var(--border))",
          borderWidth: 1.4,
        },
        emphasis: {
          itemStyle: {
            areaColor: "hsl(var(--muted-foreground)/0.15)",
          },
        },
      },
      series: [
        {
          name: "Concentración de clientes",
          type: "heatmap",
          coordinateSystem: "geo",
          data: heatmapData.points.map((point) => [point.lon, point.lat, point.weight]),
          pointSize: 22,
          blurSize: 30,
          progressive: 500,
        },
      ],
    } as echarts.EChartsOption;
  }, [heatmapData]);

  // Sample historical data
  const lineChartOption = {
    title: {
      text: "Evolución de Pedidos vs Indicadores Económicos",
      left: "center",
      textStyle: {
        color: "hsl(var(--foreground))",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Pedidos Online", "PIB (% crecimiento)", "Inflación (%)"],
      bottom: 0,
      textStyle: {
        color: "hsl(var(--foreground))",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      axisLine: {
        lineStyle: {
          color: "hsl(var(--border))",
        },
      },
      axisLabel: {
        color: "hsl(var(--muted-foreground))",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "hsl(var(--border))",
        },
      },
      axisLabel: {
        color: "hsl(var(--muted-foreground))",
      },
      splitLine: {
        lineStyle: {
          color: "hsl(var(--border))",
        },
      },
    },
    series: [
      {
        name: "Pedidos Online",
        type: "line",
        smooth: true,
        data: [1200, 1320, 1450, 1380, 1520, 1690, 1850, 1780, 1920, 2100, 2250, 2400],
        itemStyle: {
          color: "hsl(var(--chart-1))",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "hsla(var(--chart-1), 0.5)" },
              { offset: 1, color: "hsla(var(--chart-1), 0.05)" },
            ],
          },
        },
      },
      {
        name: "PIB (% crecimiento)",
        type: "line",
        smooth: true,
        data: [2.1, 2.3, 2.5, 2.2, 2.6, 2.8, 3.0, 2.9, 3.1, 3.3, 3.5, 3.7],
        itemStyle: {
          color: "hsl(var(--chart-2))",
        },
      },
      {
        name: "Inflación (%)",
        type: "line",
        smooth: true,
        data: [4.5, 4.3, 4.0, 3.8, 3.5, 3.3, 3.0, 2.9, 2.7, 2.5, 2.3, 2.1],
        itemStyle: {
          color: "hsl(var(--chart-3))",
        },
      },
    ],
  };

  const barChartOption = {
    title: {
      text: "Pedidos por Categoría de Producto",
      left: "center",
      textStyle: {
        color: "hsl(var(--foreground))",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Electrónica", "Moda", "Hogar", "Deportes", "Belleza", "Alimentos"],
      axisLine: {
        lineStyle: {
          color: "hsl(var(--border))",
        },
      },
      axisLabel: {
        color: "hsl(var(--muted-foreground))",
        rotate: 15,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "hsl(var(--border))",
        },
      },
      axisLabel: {
        color: "hsl(var(--muted-foreground))",
      },
      splitLine: {
        lineStyle: {
          color: "hsl(var(--border))",
        },
      },
    },
    series: [
      {
        data: [
          { value: 820, itemStyle: { color: "hsl(var(--chart-1))" } },
          { value: 932, itemStyle: { color: "hsl(var(--chart-2))" } },
          { value: 701, itemStyle: { color: "hsl(var(--chart-3))" } },
          { value: 534, itemStyle: { color: "hsl(var(--chart-4))" } },
          { value: 690, itemStyle: { color: "hsl(var(--chart-5))" } },
          { value: 1230, itemStyle: { color: "hsl(var(--chart-1))" } },
        ],
        type: "bar",
        barWidth: "60%",
      },
    ],
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Consumo Histórico</h1>
          <p className="text-lg text-muted-foreground">
            Análisis histórico del comportamiento del e-commerce y su relación con indicadores económicos
          </p>
        </div>

        <div className="grid gap-6 mb-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Tendencias Temporales</CardTitle>
              <CardDescription>
                Visualización de la evolución de pedidos online correlacionada con indicadores macroeconómicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={lineChartOption} style={{ height: "400px" }} />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Mapa de calor de clientes</CardTitle>
              <CardDescription>
                Concentración histórica de clientes por coordenada geográfica en Brasil.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Map className="h-4 w-4" />
                {heatmapData?.points.length ? (
                  <span>
                    {`Mostrando ${heatmapData.points.length} celdas activas y ${totalHeatmapCustomers.toLocaleString()} clientes acumulados.`}
                  </span>
                ) : (
                  <span>Esperando datos de densidad de clientes.</span>
                )}
              </div>

              {isHeatmapLoading ? (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Cargando zonas de calor...
                </div>
              ) : isHeatmapError ? (
                <div className="text-sm text-red-600">No se pudo obtener la información geográfica. Intenta nuevamente más tarde.</div>
              ) : heatmapOption ? (
                <ReactECharts option={heatmapOption} style={{ height: "520px" }} />
              ) : (
                <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
                  No hay datos de mapa de calor disponibles por el momento.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>
                  Volumen de pedidos segmentado por categorías de productos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={barChartOption} style={{ height: "350px" }} />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Insights Clave</CardTitle>
                <CardDescription>Principales observaciones del período analizado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-chart-1"></div>
                      <h4 className="font-semibold">Crecimiento Sostenido</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Los pedidos online muestran una tendencia positiva del +100% en el año
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-chart-2"></div>
                      <h4 className="font-semibold">Correlación con PIB</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Existe una correlación positiva entre el crecimiento del PIB y los pedidos
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-chart-3"></div>
                      <h4 className="font-semibold">Impacto de Inflación</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      La reducción de inflación coincide con aumento en el consumo online
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricConsumption;
