import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Loader2, Map, Filter, ChevronDown, MapPin, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import brazilGeoJson from "@/data/brazil_geo.json";
import { fetchCustomerHeatmap } from "@/services/heatmapService";
import type { CustomerHeatmapData } from "@/services/heatmapTypes";
import type { CustomerSellerMapData } from "@/services/customerSellerMapTypes";
import { fetchCustomerSellerMap } from "@/services/customerSellerMapService";

const HistoricConsumption = () => {
  const {
    data: heatmapData,
    isLoading: isHeatmapLoading,
    isError: isHeatmapError,
  } = useQuery<CustomerHeatmapData>({
    queryKey: ["customer-heatmap"],
    queryFn: fetchCustomerHeatmap,
  });

  const {
    data: customerSellerData,
    isLoading: isCustomerSellerLoading,
    isError: isCustomerSellerError,
  } = useQuery<CustomerSellerMapData>({
    queryKey: ["customer-seller-map"],
    queryFn: fetchCustomerSellerMap,
  });

  const [selectedLayers, setSelectedLayers] = useState({
    heatmap: true,
    customers: true,
    sellers: true,
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
  type MapTooltipParams = echarts.DefaultLabelFormatterCallbackParams & {
    data?: { category?: "customer" | "seller" } & Record<string, unknown>;
    value?: [number, number, number];
  };

  const mapOption = useMemo<echarts.EChartsOption>(() => {
    const hasHeatmap = selectedLayers.heatmap && !!heatmapData?.points.length;
    const hasCustomers = selectedLayers.customers && !!customerSellerData?.customers.length;
    const hasSellers = selectedLayers.sellers && !!customerSellerData?.sellers.length;

    const maxWeight = hasHeatmap ? Math.max(...(heatmapData?.points.map((point) => point.weight) ?? [0])) : 0;

    const series: echarts.SeriesOption[] = [];
    let heatmapSeriesIndex: number | null = null;

    if (hasHeatmap && heatmapData) {
      heatmapSeriesIndex = series.length;
      series.push({
        name: "Concentración de clientes",
        type: "heatmap",
        coordinateSystem: "geo",
        data: heatmapData.points.map((point) => [point.lon, point.lat, point.weight]),
        pointSize: 22,
        blurSize: 30,
        progressive: 500,
      });
    }

    if (hasCustomers && customerSellerData) {
      series.push({
        name: "Clientes",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "circle",
        symbolSize: 9,
        itemStyle: {
          color: "#2563eb",
          shadowBlur: 6,
          shadowColor: "rgba(37, 99, 235, 0.25)",
        },
        emphasis: { itemStyle: { color: "#2563eb" } },
        data: customerSellerData.customers.map((point, index) => ({
          name: `Cliente #${index + 1}`,
          value: [point.lon, point.lat, 1],
          category: "customer",
        })),
      });
    }

    if (hasSellers && customerSellerData) {
      series.push({
        name: "Sellers",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "diamond",
        symbolSize: 10,
        itemStyle: {
          color: "#f59e0b",
          shadowBlur: 6,
          shadowColor: "rgba(245, 158, 11, 0.25)",
        },
        emphasis: { itemStyle: { color: "#f59e0b" } },
        data: customerSellerData.sellers.map((point, index) => ({
          name: `Seller #${index + 1}`,
          value: [point.lon, point.lat, 1],
          category: "seller",
        })),
      });
    }

    if (!hasHeatmap && !hasCustomers && !hasSellers) {
      series.push({
        name: "Mapa base",
        type: "map",
        map: "brazil",
        geoIndex: 0,
        data: [],
        silent: true,
        tooltip: { show: false },
      });
    }

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        borderColor: "hsl(var(--border))",
        formatter: (params: MapTooltipParams) => {
          if (params.seriesType === "heatmap") {
            const [lon, lat, value] = params.value || [];
            return `
              <div style="min-width:180px;">                <div style="font-weight:600;margin-bottom:6px;">Zona con clientes</div>                <div style="font-size:12px;line-height:1.5;">                  <div>Lat: ${lat?.toFixed?.(2) ?? lat}</div>                  <div>Lon: ${lon?.toFixed?.(2) ?? lon}</div>                  <div>Clientes estimados: ${value}</div>                </div>              </div>            `;
          }

          const isCustomer = params.data?.category === "customer";
          const iconColor = isCustomer ? "#2563eb" : "#f59e0b";
          const label = isCustomer ? "Cliente" : "Seller";
          const [lon, lat] = params.value || [];

          return `
            <div style="min-width:180px;">              <div style="display:flex;align-items:center;gap:8px;">                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${iconColor}"></span>                <strong>${label} ${params.dataIndex + 1}</strong>              </div>              <div style="margin-top:6px;font-size:12px;line-height:1.5;">                <div>Lat: ${lat?.toFixed?.(2) ?? lat}</div>                <div>Lon: ${lon?.toFixed?.(2) ?? lon}</div>              </div>            </div>          `;
        },
      },
      visualMap:
        hasHeatmap && heatmapSeriesIndex !== null
          ? {
              min: 0,
              max: maxWeight || 10,
              show: true,
              orient: "horizontal",
              left: "center",
              bottom: 20,
              text: ["Mayor densidad", "Menor"],
              textGap: 12,
              textStyle: { color: "hsl(var(--muted-foreground))" },
              calculable: false,
              inRange: {
                color: ["#e0f2fe", "#38bdf8", "#0ea5e9", "#0369a1"],
              },
              itemWidth: 220,
              itemHeight: 14,
              seriesIndex: [heatmapSeriesIndex],
              padding: [10, 14],
            }
          : undefined,
      legend: {
        data: series.map((item) => item.name as string),
        icon: "circle",
        bottom: 16,
        textStyle: { color: "hsl(var(--muted-foreground))" },
        selectedMode: false,
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
      series,
    } as echarts.EChartsOption;
  }, [customerSellerData, heatmapData, selectedLayers]);

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
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <CardTitle>Mapa de Brasil</CardTitle>
                <CardDescription>
                  Activa el mapa de calor histórico o los puntos de clientes y sellers para validarlo visualmente.
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between gap-2 md:w-auto">
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Capas del mapa
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Selecciona qué ver</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.heatmap}
                    onCheckedChange={(checked) =>
                      setSelectedLayers((prev) => ({ ...prev, heatmap: Boolean(checked) }))
                    }
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span>Mapa de calor</span>
                      <span className="h-3 w-3 rounded-full bg-sky-500" />
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.customers}
                    onCheckedChange={(checked) =>
                      setSelectedLayers((prev) => ({ ...prev, customers: Boolean(checked) }))
                    }
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span>Clientes</span>
                      <span className="h-3 w-3 rounded-full bg-blue-600" />
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.sellers}
                    onCheckedChange={(checked) =>
                      setSelectedLayers((prev) => ({ ...prev, sellers: Boolean(checked) }))
                    }
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span>Sellers</span>
                      <span className="h-3 w-3 rounded-full bg-amber-500" />
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.heatmap && selectedLayers.customers && selectedLayers.sellers}
                    onCheckedChange={(checked) =>
                      setSelectedLayers({ heatmap: Boolean(checked), customers: Boolean(checked), sellers: Boolean(checked) })
                    }
                  >
                    Mostrar todo
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Map className="h-4 w-4" />
                <span>
                  {selectedLayers.heatmap ? "Mapa de calor activo" : "Mapa de calor oculto"} | {selectedLayers.customers ? "Clientes visibles" : "Clientes ocultos"} | {selectedLayers.sellers ? "Sellers visibles" : "Sellers ocultos"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700">
                  <Map className="h-3 w-3" /> {heatmapData?.points.length ?? 0} celdas | {totalHeatmapCustomers.toLocaleString()} clientes
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  <MapPin className="h-3 w-3" /> {customerSellerData?.customers.length ?? 0} clientes
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                  <ShoppingBag className="h-3 w-3" /> {customerSellerData?.sellers.length ?? 0} sellers
                </span>
              </div>

              {isHeatmapLoading || isCustomerSellerLoading ? (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Cargando datos geográficos...
                </div>
              ) : isHeatmapError || isCustomerSellerError ? (
                <div className="text-sm text-red-600">No se pudo obtener la información geográfica. Intenta nuevamente más tarde.</div>
              ) : mapOption ? (
                <ReactECharts option={mapOption} style={{ height: "520px" }} notMerge />
              ) : (
                <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
                  No hay capas activas o datos disponibles para mostrar en el mapa.
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
