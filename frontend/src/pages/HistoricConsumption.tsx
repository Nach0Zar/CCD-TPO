import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Flame, MapPin, Store, Users, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import brazilGeoJson from "@/data/brazil_geo.json";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchCustomerHeatmap, fetchCustomerSellerMap } from "@/services/mapService";

const HistoricConsumption = () => {
  const [selectedLayers, setSelectedLayers] = useState({
    heatmap: true,
    customers: true,
    sellers: false,
  });

  useEffect(() => {
    if (!echarts.getMap("brazil")) {
      echarts.registerMap("brazil", brazilGeoJson as any);
    }
  }, []);

  const {
    data: customerHeatmap,
    isLoading: isLoadingHeatmap,
    isError: isHeatmapError,
  } = useQuery({
    queryKey: ["customer-heatmap"],
    queryFn: fetchCustomerHeatmap,
  });

  const {
    data: customerSellerMap,
    isLoading: isLoadingCustomerSeller,
    isError: isCustomerSellerError,
  } = useQuery({
    queryKey: ["customer-seller-map"],
    queryFn: fetchCustomerSellerMap,
  });

  const activeLayers = useMemo(
    () =>
      [
        selectedLayers.heatmap && "heatmap",
        selectedLayers.customers && "customers",
        selectedLayers.sellers && "sellers",
      ].filter(Boolean) as string[],
    [selectedLayers],
  );

  const customerCount = customerSellerMap?.customers?.length ?? 0;
  const sellerCount = customerSellerMap?.sellers?.length ?? 0;

  const mapOption = useMemo(() => {
    const baseSeries: echarts.EChartsOption["series"] = [
      {
        type: "map",
        map: "brazil",
        roam: true,
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
        select: { disabled: true },
        data: [],
      },
    ];

    const series: echarts.EChartsOption["series"] = [...baseSeries];

    if (selectedLayers.heatmap && customerHeatmap?.points?.length) {
      series.push({
        name: "Densidad de clientes",
        type: "heatmap",
        coordinateSystem: "geo",
        data: customerHeatmap.points.map((point) => [point.lon, point.lat, point.weight]),
        pointSize: 12,
        blurSize: 20,
      });
    }

    if (selectedLayers.customers && customerSellerMap?.customers?.length) {
      series.push({
        name: "Clientes",
        type: "scatter",
        coordinateSystem: "geo",
        data: customerSellerMap.customers.map((point) => ({ value: [point.lon, point.lat] })),
        symbolSize: 10,
        itemStyle: {
          color: "#0ea5e9",
          shadowBlur: 6,
          shadowColor: "rgba(14, 165, 233, 0.35)",
        },
        emphasis: { itemStyle: { borderColor: "#0ea5e9", borderWidth: 1 } },
      });
    }

    if (selectedLayers.sellers && customerSellerMap?.sellers?.length) {
      series.push({
        name: "Sellers",
        type: "scatter",
        coordinateSystem: "geo",
        data: customerSellerMap.sellers.map((point) => ({ value: [point.lon, point.lat] })),
        symbolSize: 10,
        itemStyle: {
          color: "#f97316",
          shadowBlur: 6,
          shadowColor: "rgba(249, 115, 22, 0.35)",
        },
        emphasis: { itemStyle: { borderColor: "#f97316", borderWidth: 1 } },
      });
    }

    const hasHeatmap = selectedLayers.heatmap && customerHeatmap?.points?.length;

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          if (params.seriesType === "heatmap") {
            return `Punto con densidad de clientes: ${params.data?.[2] ?? 0}`;
          }

          if (params.seriesName === "Clientes") {
            return "Cliente geolocalizado";
          }

          if (params.seriesName === "Sellers") {
            return "Seller geolocalizado";
          }

          return params.name || "Brasil";
        },
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
          itemStyle: { areaColor: "hsl(var(--muted-foreground)/0.15)" },
        },
      },
      visualMap: hasHeatmap
        ? {
            min: 0,
            max: Math.max(...customerHeatmap.points.map((point) => point.weight), 10),
            orient: "horizontal",
            left: "center",
            bottom: 20,
            textStyle: { color: "hsl(var(--muted-foreground))" },
            inRange: {
              color: ["#e0f2fe", "#0ea5e9"],
            },
          }
        : undefined,
      series,
    } as echarts.EChartsOption;
  }, [customerHeatmap, customerSellerMap, selectedLayers]);

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
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <CardTitle>Mapa de calor y puntos georreferenciados</CardTitle>
                <CardDescription>
                  Visualiza la intensidad de clientes y activa los puntos de clientes o sellers según necesidad.
                </CardDescription>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Capas del mapa
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.heatmap}
                    onCheckedChange={(checked) =>
                      setSelectedLayers((prev) => ({ ...prev, heatmap: Boolean(checked) }))
                    }
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>Zona de calor</span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Flame className="h-4 w-4 text-orange-500" />
                        {customerHeatmap?.points?.length ?? 0}
                      </span>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.customers}
                    onCheckedChange={(checked) =>
                      setSelectedLayers((prev) => ({ ...prev, customers: Boolean(checked) }))
                    }
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>Puntos de clientes</span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-4 w-4 text-sky-500" />
                        {customerCount}
                      </span>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedLayers.sellers}
                    onCheckedChange={(checked) =>
                      setSelectedLayers((prev) => ({ ...prev, sellers: Boolean(checked) }))
                    }
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>Puntos de sellers</span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Store className="h-4 w-4 text-orange-500" />
                        {sellerCount}
                      </span>
                    </div>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Flame className={`h-4 w-4 ${selectedLayers.heatmap ? "text-orange-500" : "text-muted-foreground"}`} />
                  <div>
                    <p className="text-sm font-semibold">Mapa de calor</p>
                    <p className="text-xs text-muted-foreground">{customerHeatmap?.points?.length ?? 0} puntos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Users className={`h-4 w-4 ${selectedLayers.customers ? "text-sky-500" : "text-muted-foreground"}`} />
                  <div>
                    <p className="text-sm font-semibold">Clientes</p>
                    <p className="text-xs text-muted-foreground">{customerCount} coordenadas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Store className={`h-4 w-4 ${selectedLayers.sellers ? "text-orange-500" : "text-muted-foreground"}`} />
                  <div>
                    <p className="text-sm font-semibold">Sellers</p>
                    <p className="text-xs text-muted-foreground">{sellerCount} coordenadas</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {activeLayers.length ? (
                  <span>Capas activas: {activeLayers.join(", ")}</span>
                ) : (
                  <span>Sin capas seleccionadas, se muestra únicamente el mapa base de Brasil.</span>
                )}
              </div>

              {isLoadingHeatmap || isLoadingCustomerSeller ? (
                <div className="text-sm text-muted-foreground">Cargando tráfico geográfico...</div>
              ) : isHeatmapError || isCustomerSellerError ? (
                <div className="text-sm text-red-600">
                  No se pudo obtener la información del mapa. Se muestran datos mock para continuar con las pruebas.
                </div>
              ) : null}

              <ReactECharts option={mapOption} style={{ height: "520px" }} />
            </CardContent>
          </Card>

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
