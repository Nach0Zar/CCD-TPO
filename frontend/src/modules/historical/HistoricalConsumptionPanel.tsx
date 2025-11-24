import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryBarsChart from "@/modules/historical/CategoryBarsChart";
import TimeSeriesChart from "@/modules/historical/TimeSeriesChart";
import type {
  CategoryConsumptionData,
  TimeSeriesChartData,
} from "@/services/historicalService";
import {
  fetchCategoryConsumption,
  fetchTimeSeriesSales,
} from "@/services/historicalService";

/*
Ejemplo de uso en una página:

import HistoricalConsumptionPanel from "@/modules/historical/HistoricalConsumptionPanel";

const HistoricalView = () => <HistoricalConsumptionPanel />;
*/

const HistoricalConsumptionPanel = () => {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesChartData | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryConsumptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [timeSeries, categories] = await Promise.all([
          fetchTimeSeriesSales("month"),
          fetchCategoryConsumption(),
        ]);

        if (!isMounted) return;

        setTimeSeriesData(timeSeries);
        setCategoryData(categories);
      } catch (err) {
        console.error("Error loading historical consumption data", err);
        if (isMounted) {
          setError("No se pudieron cargar los datos históricos.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center rounded-lg border p-8 text-muted-foreground">
        Cargando datos históricos…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center rounded-lg border p-8 text-destructive">
        {error}
      </div>
    );
  }

  if (!timeSeriesData || !categoryData) {
    return (
      <div className="flex w-full items-center justify-center rounded-lg border p-8 text-muted-foreground">
        No hay datos para mostrar.
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Evolución de ventas</CardTitle>
            <CardDescription>Histórico de ventas por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <TimeSeriesChart data={timeSeriesData} />
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Consumo por categoría</CardTitle>
            <CardDescription>Ventas totales por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryBarsChart data={categoryData} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HistoricalConsumptionPanel;
