import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { Filter, ChevronDown, MapPin } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlgorithmType, warehouseLocations } from "@/data/warehouseLocations";
import brazilGeoJson from "@/data/brazilGeoJson";

const algorithmStyles: Record<AlgorithmType, { label: string; color: string }> = {
  MinibatchKMeans: { label: "MinibatchKMeans", color: "#ef4444" },
  KMeans: { label: "KMeans", color: "#2563eb" },
  GMM: { label: "GMM", color: "#22c55e" },
};

const PredictiveConsumption = () => {
  const allAlgorithms = Object.keys(algorithmStyles) as AlgorithmType[];
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<AlgorithmType[]>(allAlgorithms);

  useEffect(() => {
    if (!echarts.getMap("brazil")) {
      echarts.registerMap("brazil", brazilGeoJson as any);
    }
  }, []);

  const handleAlgorithmChange = (algorithm: AlgorithmType, checked: boolean) => {
    setSelectedAlgorithms((prev) => {
      if (checked) {
        return prev.includes(algorithm) ? prev : [...prev, algorithm];
      }
      return prev.filter((item) => item !== algorithm);
    });
  };

  const filteredLocations = useMemo(
    () => warehouseLocations.filter((location) => selectedAlgorithms.includes(location.algorithm)),
    [selectedAlgorithms],
  );

  const mapOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        borderColor: "hsl(var(--border))",
        formatter: (params: any) => {
          const data = params.data;
          const color = algorithmStyles[data.algorithm as AlgorithmType]?.color;
          return `
            <div style="min-width: 180px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color}"></span>
                <strong>${params.name}</strong>
              </div>
              <div style="margin-top:6px;font-size:12px;">
                <div>Algoritmo: ${data.algorithm}</div>
                <div>Clientes: ${data.customer_count}</div>
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
          areaColor: "hsl(var(--muted))",
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
                {allAlgorithms.map((algorithm) => (
                  <DropdownMenuCheckboxItem
                    key={algorithm}
                    checked={selectedAlgorithms.includes(algorithm)}
                    onCheckedChange={(checked) => handleAlgorithmChange(algorithm, Boolean(checked))}
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
            {allAlgorithms.map((algorithm) => {
              const total = warehouseLocations.filter((item) => item.algorithm === algorithm).length;
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
          <CardContent>
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {selectedAlgorithms.length ? (
                <span>
                  Mostrando {filteredLocations.length} ubicaciones filtradas por {selectedAlgorithms.join(", ")}.
                </span>
              ) : (
                <span>Selecciona al menos un algoritmo para visualizar los puntos.</span>
              )}
            </div>
            <ReactECharts option={mapOption} style={{ height: "520px" }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveConsumption;
