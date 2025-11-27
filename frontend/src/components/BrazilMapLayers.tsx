import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Layers, Loader2, ChevronDown } from "lucide-react";

import brazilGeoJson from "@/data/brazil_geo.json";
import {
  fetchCustomerHeatmap,
  fetchCustomerSellerPoints,
  type CustomerHeatmapData,
  type CustomerSellerMapData,
} from "@/services/mapService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const layerLabels = {
  heatmap: "Heatmap de clientes",
  customers: "Clientes (puntos)",
  sellers: "Sellers (puntos)",
} as const;

type LayerKey = keyof typeof layerLabels;

const BrazilMapLayers = () => {
  const [heatmapData, setHeatmapData] = useState<CustomerHeatmapData | null>(null);
  const [pointData, setPointData] = useState<CustomerSellerMapData | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<Record<LayerKey, boolean>>({
    heatmap: false,
    customers: true,
    sellers: true,
  });
  const [loading, setLoading] = useState({ heatmap: false, points: false });
  const [error, setError] = useState<{ heatmap?: string; points?: string }>({});

  useEffect(() => {
    if (!echarts.getMap("brazil")) {
      echarts.registerMap("brazil", brazilGeoJson as any);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading((state) => ({ ...state, heatmap: true }));

    fetchCustomerHeatmap()
      .then((data) => {
        if (!isMounted) return;
        setHeatmapData(data);
        setError((state) => ({ ...state, heatmap: undefined }));
      })
      .catch((err) => {
        if (!isMounted) return;
        setError((state) => ({ ...state, heatmap: err.message ?? "Error cargando heatmap" }));
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading((state) => ({ ...state, heatmap: false }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading((state) => ({ ...state, points: true }));

    fetchCustomerSellerPoints()
      .then((data) => {
        if (!isMounted) return;
        setPointData(data);
        setError((state) => ({ ...state, points: undefined }));
      })
      .catch((err) => {
        if (!isMounted) return;
        setError((state) => ({ ...state, points: err.message ?? "Error cargando puntos" }));
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading((state) => ({ ...state, points: false }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleLayer = (layer: LayerKey) => {
    setVisibleLayers((current) => ({ ...current, [layer]: !current[layer] }));
  };

  const hasHeatmap = Boolean(visibleLayers.heatmap && heatmapData?.points?.length);
  const hasCustomers = Boolean(visibleLayers.customers && pointData?.customers?.length);
  const hasSellers = Boolean(visibleLayers.sellers && pointData?.sellers?.length);

  const series = useMemo(() => {
    const mappedSeries: echarts.EChartsOption["series"] = [];

    if (hasHeatmap) {
      mappedSeries.push({
        name: layerLabels.heatmap,
        type: "heatmap",
        coordinateSystem: "geo",
        data: heatmapData?.points.map((point) => [point.lon, point.lat, point.weight]) ?? [],
        pointSize: 14,
        blurSize: 22,
      });
    }

    if (hasCustomers) {
      mappedSeries.push({
        name: layerLabels.customers,
        type: "scatter",
        coordinateSystem: "geo",
        data: pointData?.customers.map((point) => ({ value: [point.lon, point.lat] })) ?? [],
        symbolSize: 9,
        itemStyle: {
          color: "#0ea5e9",
          shadowBlur: 8,
          shadowColor: "rgba(14,165,233,0.25)",
        },
        emphasis: {
          itemStyle: {
            borderColor: "hsl(var(--foreground))",
            borderWidth: 1,
          },
        },
      });
    }

    if (hasSellers) {
      mappedSeries.push({
        name: layerLabels.sellers,
        type: "scatter",
        coordinateSystem: "geo",
        data: pointData?.sellers.map((point) => ({ value: [point.lon, point.lat] })) ?? [],
        symbolSize: 9,
        itemStyle: {
          color: "#f97316",
          shadowBlur: 8,
          shadowColor: "rgba(249,115,22,0.25)",
        },
        emphasis: {
          itemStyle: {
            borderColor: "hsl(var(--foreground))",
            borderWidth: 1,
          },
        },
      });
    }

    return mappedSeries;
  }, [hasCustomers, hasHeatmap, hasSellers, heatmapData?.points, pointData?.customers, pointData?.sellers]);

  const visualMap = useMemo(() => {
    if (!hasHeatmap || !heatmapData?.points.length) return undefined;
    const weights = heatmapData.points.map((point) => point.weight);
    const max = Math.max(...weights);
    const min = Math.min(...weights);

    return {
      show: true,
      min,
      max,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: 12,
      inRange: {
        color: ["#e0f2fe", "#0284c7"],
      },
      textStyle: {
        color: "hsl(var(--muted-foreground))",
      },
    } as echarts.EChartsOption["visualMap"];
  }, [hasHeatmap, heatmapData?.points]);

  const option = useMemo<echarts.EChartsOption>(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          if (params.seriesType === "heatmap") {
            return `${layerLabels.heatmap}: ${params.value?.[2] ?? 0}`;
          }
          return `${params.seriesName}: ${params.value?.[0]?.toFixed(2)}, ${params.value?.[1]?.toFixed(2)}`;
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
          itemStyle: {
            areaColor: "hsl(var(--muted-foreground)/0.15)",
          },
        },
      },
      visualMap,
      series,
    }),
    [series, visualMap],
  );

  const isLoading = loading.heatmap || loading.points;
  const hasErrors = error.heatmap || error.points;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Layers className="h-5 w-5" />
            Mapa de clientes y sellers
          </CardTitle>
          <CardDescription>Activa o desactiva capas para visualizar el mapa de Brasil.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ChevronDown className="h-4 w-4" />
              Capas visibles
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Capas del mapa</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(layerLabels) as LayerKey[]).map((layer) => (
              <DropdownMenuCheckboxItem
                key={layer}
                checked={visibleLayers[layer]}
                onCheckedChange={() => toggleLayer(layer)}
              >
                {layerLabels[layer]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="relative h-[520px] w-full rounded-lg border bg-card/30 p-2">
          {isLoading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Cargando capas...
              </div>
            </div>
          ) : null}

          {hasErrors ? (
            <div className="absolute left-4 top-4 z-20 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error.heatmap || error.points}
            </div>
          ) : null}

          <ReactECharts option={option} notMerge lazyUpdate style={{ height: "100%", width: "100%" }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BrazilMapLayers;
