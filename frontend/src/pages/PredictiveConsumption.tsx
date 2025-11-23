import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Filter, ChevronDown, MapPin, Loader2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { fetchWarehousePredictions } from "@/services/predictiveService";
import type { AlgorithmType, PredictiveWarehouse } from "@/services/predictiveTypes";
import { algorithmOrder } from "@/data/warehouseLocations";
import brazilGeoJson from "@/data/brazil_geo.json";

const algorithmStyles: Record<AlgorithmType, { label: string; color: string }> = {
  kmeans: { label: "KMeans", color: "#2563eb" },
  gmm: { label: "GMM", color: "#22c55e" },
  minibatchkmeans: { label: "MinibatchKMeans", color: "#ef4444" },
};

const PredictiveConsumption = () => {
  const { data: warehouseData = [], isLoading, isError } = useQuery({
    queryKey: ["predictive-warehouses"],
    queryFn: fetchWarehousePredictions,
  });

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmType[]>(algorithmOrder);

  useEffect(() => {
    if (!echarts.getMap("brazil")) {
      echarts.registerMap("brazil", brazilGeoJson as any);
    }
  }, []);

  useEffect(() => {
    if (warehouseData.length) {
      const available = Array.from(new Set(warehouseData.map((item) => item.algorithm))) as AlgorithmType[];
      setSelectedAlgorithms(available);
    }
  }, [warehouseData]);

  const filteredLocations = useMemo(
    () => warehouseData.filter((location) => selectedAlgorithms.includes(location.algorithm)),
    [warehouseData, selectedAlgorithms],
  );

  const totalByAlgorithm = useMemo(() => {
    return warehouseData.reduce<Record<AlgorithmType, number>>((acc, current) => {
      acc[current.algorithm] = (acc[current.algorithm] || 0) + 1;
      return acc;
    }, {} as Record<AlgorithmType, number>);
  }, [warehouseData]);

  const activeAlgorithms = selectedAlgorithms.length ? selectedAlgorithms : algorithmOrder;

  const growthStats = useMemo(() => {
    const byAlgorithm = activeAlgorithms.reduce(
      (acc, algorithm) => {
        const warehouses = filteredLocations.filter((location) => location.algorithm === algorithm);
        const growth1y = warehouses
          .map((warehouse) => warehouse.estimated_customer_growth_1y)
          .filter((value): value is number => typeof value === "number");
        const growth2y = warehouses
          .map((warehouse) => warehouse.estimated_customer_growth_2y)
          .filter((value): value is number => typeof value === "number");

        const computeBoxData = (values: number[]) => {
          if (!values.length) return null;
          const sorted = [...values].sort((a, b) => a - b);
          const percentile = (p: number) => {
            const position = (sorted.length - 1) * p;
            const base = Math.floor(position);
            const rest = position - base;
            return sorted[base] + rest * (sorted[base + 1] - sorted[base] || 0);
          };

          const mean = sorted.reduce((sum, value) => sum + value, 0) / sorted.length;
          return {
            box: [sorted[0], percentile(0.25), percentile(0.5), percentile(0.75), sorted[sorted.length - 1]],
            mean,
          };
        };

        return {
          ...acc,
          [algorithm]: {
            count: warehouses.length,
            growth1y: computeBoxData(growth1y),
            growth2y: computeBoxData(growth2y),
          },
        };
      },
      {} as Record<AlgorithmType, { count: number; growth1y: { box: number[]; mean: number } | null; growth2y: { box: number[]; mean: number } | null }>,
    );

    const categories = activeAlgorithms.filter((algorithm) => byAlgorithm[algorithm]?.count);

    return { byAlgorithm, categories };
  }, [activeAlgorithms, filteredLocations]);

  const boxplotOption = useMemo(() => {
    if (!growthStats.categories.length) return null;

    const seriesFactory = (
      label: string,
      key: "growth1y" | "growth2y",
      color: string,
    ): echarts.EChartsOption["series"] => ({
      name: label,
      type: "boxplot",
      itemStyle: { color, borderColor: color },
      emphasis: { itemStyle: { color, borderColor: color, opacity: 0.7 } },
      data: growthStats.categories.map((algorithm) => growthStats.byAlgorithm[algorithm]?.[key]?.box || [0, 0, 0, 0, 0]),
      tooltip: {
        formatter: (params: any) => {
          const algorithm = growthStats.categories[params.dataIndex];
          const stat = growthStats.byAlgorithm[algorithm]?.[key];
          const mean = stat?.mean;
          const labelText = key === "growth1y" ? "Crecimiento 1 año" : "Crecimiento 2 años";
          return `
            <div style="min-width:200px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color}"></span>
                <strong>${algorithmStyles[algorithm].label}</strong>
              </div>
              <div style="margin-top:6px;font-size:12px;line-height:1.5;">
                <div>${labelText}</div>
                ${mean ? `<div>Media: ${mean.toFixed(0)}</div>` : ""}
                <div>Warehouses analizados: ${growthStats.byAlgorithm[algorithm]?.count ?? 0}</div>
              </div>
            </div>
          `;
        },
      },
    });

    return {
      tooltip: { trigger: "item", axisPointer: { type: "shadow" } },
      legend: {
        data: ["Crecimiento 1 año", "Crecimiento 2 años"],
        icon: "circle",
        bottom: 0,
      },
      grid: { left: "3%", right: "4%", bottom: "16%", containLabel: true },
      xAxis: {
        type: "category",
        data: growthStats.categories.map((algorithm) => algorithmStyles[algorithm].label),
        axisLabel: { rotate: 10 },
      },
      yAxis: {
        type: "value",
        name: "Clientes proyectados",
        splitLine: { lineStyle: { type: "dashed" } },
      },
      series: [
        seriesFactory("Crecimiento 1 año", "growth1y", "#0ea5e9"),
        seriesFactory("Crecimiento 2 años", "growth2y", "#8b5cf6"),
      ],
    } as echarts.EChartsOption;
  }, [growthStats]);

  const mapOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        borderColor: "hsl(var(--border))",
        formatter: (params: any) => {
          const data: PredictiveWarehouse = params.data;
          const color = algorithmStyles[data.algorithm as AlgorithmType]?.color;
          return `
            <div style="min-width: 220px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color}"></span>
                <strong>${params.name}</strong>
              </div>
              <div style="margin-top:6px;font-size:12px;line-height:1.5;">
                <div>Algoritmo: ${algorithmStyles[data.algorithm]?.label ?? data.algorithm}</div>
                <div>Clientes: ${data.customer_count}</div>
                ${
                  data.estimated_delivery_improvement_pct
                    ? `<div>Mejora estimada: ${data.estimated_delivery_improvement_pct}%</div>`
                    : ""
                }
                ${
                  data.estimated_customer_growth_1y
                    ? `<div>Crecimiento 1 año: ${data.estimated_customer_growth_1y}</div>`
                    : ""
                }
                ${data.note ? `<div>Nota: ${data.note}</div>` : ""}
              </div>
            </div>
          `;
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
      series: [
        {
          name: "Centros logísticos",
          type: "scatter",
          coordinateSystem: "geo",
          data: filteredLocations.map((location) => ({
            name: `Almacén #${location.warehouse_id}`,
            value: [location.longitude, location.latitude, location.customer_count],
            algorithm: location.algorithm,
            customer_count: location.customer_count,
            note: location.note,
            estimated_delivery_improvement_pct: location.estimated_delivery_improvement_pct,
            estimated_customer_growth_1y: location.estimated_customer_growth_1y,
          })),
          symbolSize: (val: number[]) => Math.max(8, Math.min(18, (val?.[2] ?? 0) / 150)),
          itemStyle: {
            color: (params: any) => algorithmStyles[params.data.algorithm as AlgorithmType].color,
            shadowBlur: 8,
            shadowColor: "rgba(0, 0, 0, 0.25)",
          },
          emphasis: {
            itemStyle: {
              borderColor: "hsl(var(--foreground))",
              borderWidth: 1,
            },
          },
        },
      ],
    }),
    [filteredLocations],
  );

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Visualización predictiva</p>
          <h1 className="text-4xl font-bold">Modelos de distribución</h1>
          <p className="text-lg text-muted-foreground">
            Selecciona los algoritmos que quieres comparar y observa su distribución geográfica sobre Brasil.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <CardTitle>Modelos disponibles</CardTitle>
              <CardDescription>
                Activa uno o varios algoritmos para pintar sus puntos predictivos en el mapa.
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between gap-2 md:w-auto">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Seleccionar algoritmos
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                {activeAlgorithms.map((algorithm) => (
                  <DropdownMenuCheckboxItem
                    key={algorithm}
                    checked={selectedAlgorithms.includes(algorithm)}
                    onCheckedChange={(checked) =>
                      setSelectedAlgorithms((prev) =>
                        checked ? [...new Set([...prev, algorithm])] : prev.filter((item) => item !== algorithm),
                      )
                    }
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <span>{algorithmStyles[algorithm].label}</span>
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: algorithmStyles[algorithm].color }}
                      />
                    </div>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {activeAlgorithms.map((algorithm) => {
              const total = totalByAlgorithm[algorithm] ?? 0;
              const isActive = selectedAlgorithms.includes(algorithm);
              return (
                <div
                  key={algorithm}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition ${
                    isActive ? "border-primary/60 bg-primary/5" : "opacity-60"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: algorithmStyles[algorithm].color }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{algorithmStyles[algorithm].label}</p>
                    <p className="text-sm text-muted-foreground">{total} puntos disponibles</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Ubicación de centros</CardTitle>
            <CardDescription>
              Puntos georreferenciados sobre un mapa de Brasil según el algoritmo seleccionado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {selectedAlgorithms.length ? (
                <span>
                  Mostrando {filteredLocations.length} ubicaciones filtradas por {selectedAlgorithms.join(", ")}.
                </span>
              ) : (
                <span>Selecciona al menos un algoritmo para visualizar los puntos.</span>
              )}
            </div>
            {isLoading ? (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Cargando datos predictivos...
              </div>
            ) : isError ? (
              <div className="text-sm text-red-600">No se pudo obtener la información. Intenta nuevamente más tarde.</div>
            ) : filteredLocations.length ? (
              <ReactECharts option={mapOption} style={{ height: "520px" }} />
            ) : (
              <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
                No hay ubicaciones para mostrar con los filtros actuales.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Evolución de crecimiento proyectado</CardTitle>
            <CardDescription>
              Distribución de crecimiento de clientes por algoritmo, comparando proyecciones a 1 y 2 años.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Calculando métricas de crecimiento...
              </div>
            ) : isError ? (
              <div className="text-sm text-red-600">No se pudo obtener la información. Intenta nuevamente más tarde.</div>
            ) : growthStats.categories.length && boxplotOption ? (
              <ReactECharts option={boxplotOption} style={{ height: "420px" }} />
            ) : (
              <div className="rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
                No hay datos de crecimiento disponibles para los filtros actuales.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveConsumption;
