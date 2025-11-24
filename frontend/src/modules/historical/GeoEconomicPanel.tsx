import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MacroCorrelationChart from "@/modules/historical/MacroCorrelationChart";
import StateChoroplethMap from "@/modules/historical/StateChoroplethMap";
import {
  fetchMacroCorrelation,
  fetchStateConsumption,
  type MacroCorrelationData,
  type StateConsumptionData,
} from "@/services/geoEconomicService";

/*
Ejemplo de uso en una página:

import GeoEconomicPanel from "@/modules/historical/GeoEconomicPanel";

const HistoricalGeoEconomic = () => <GeoEconomicPanel />;
*/

const indicatorOptions = [
  { value: "inflation", label: "Inflación" },
  { value: "usd_brl", label: "USD/BRL" },
  { value: "interest_rate", label: "Tasa de interés" },
];

const GeoEconomicPanel = () => {
  const [stateData, setStateData] = useState<StateConsumptionData | null>(null);
  const [macroData, setMacroData] = useState<MacroCorrelationData | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string>("inflation");
  const [loading, setLoading] = useState({ states: true, macro: true });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading((prev) => ({ ...prev, states: true }));

    fetchStateConsumption()
      .then((data) => {
        if (!isMounted) return;
        setStateData(data);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error al cargar consumo por estado", err);
        setError("No se pudo cargar el consumo por estado.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading((prev) => ({ ...prev, states: false }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading((prev) => ({ ...prev, macro: true }));

    fetchMacroCorrelation(selectedIndicator)
      .then((data) => {
        if (!isMounted) return;
        setMacroData(data);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error al cargar correlación macro", err);
        setError("No se pudo cargar la correlación macroeconómica.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading((prev) => ({ ...prev, macro: false }));
      });

    return () => {
      isMounted = false;
    };
  }, [selectedIndicator]);

  const isLoading = loading.states || loading.macro;
  const hasError = Boolean(error);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex w-full items-center justify-center rounded-lg border p-8 text-muted-foreground">
          Cargando datos geoeconómicos…
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="flex w-full items-center justify-center rounded-lg border p-8 text-destructive">
          {error}
        </div>
      );
    }

    if (!stateData || !macroData) {
      return (
        <div className="flex w-full items-center justify-center rounded-lg border p-8 text-muted-foreground">
          No hay datos para mostrar.
        </div>
      );
    }

    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Consumo por estado</CardTitle>
            <CardDescription>Mapa de calor de ventas totales por estado.</CardDescription>
          </CardHeader>
          <CardContent>
            <StateChoroplethMap data={stateData} />
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Correlación con indicador macro</CardTitle>
              <CardDescription>
                Evolución comparada entre el indicador seleccionado y las ventas.
              </CardDescription>
            </div>
            <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Selecciona un indicador" />
              </SelectTrigger>
              <SelectContent>
                {indicatorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <MacroCorrelationChart data={macroData} />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <section className="w-full" aria-label="Panel geoeconómico">
      {renderContent()}
    </section>
  );
};

export default GeoEconomicPanel;
