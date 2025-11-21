import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Activity } from "lucide-react";
import PredictionModal, { PredictionResult } from "@/components/PredictionModal";
import ReactECharts from "echarts-for-react";

const PredictiveConsumption = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionResult | null>(null);

  const handlePredictionComplete = (data: PredictionResult) => {
    setPredictionData(data);
  };

  const gaugeOption = predictionData
    ? {
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: "hsl(var(--chart-1))",
            },
            progress: {
              show: true,
              width: 18,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 18,
                color: [
                  [0.3, "hsl(var(--chart-3))"],
                  [0.7, "hsl(var(--chart-2))"],
                  [1, "hsl(var(--chart-1))"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: "hsl(var(--border))",
              },
            },
            axisLabel: {
              distance: 25,
              color: "hsl(var(--muted-foreground))",
              fontSize: 12,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}%",
              color: "hsl(var(--foreground))",
              fontSize: 32,
              offsetCenter: [0, "70%"],
            },
            data: [
              {
                value: (predictionData.confidence * 100).toFixed(0),
                name: "Confianza",
              },
            ],
            title: {
              offsetCenter: [0, "100%"],
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
            },
          },
        ],
      }
    : null;

  const factorsChartOption = predictionData
    ? {
        title: {
          text: "Impacto de Factores Económicos",
          left: "center",
          textStyle: {
            color: "hsl(var(--foreground))",
          },
        },
        tooltip: {
          trigger: "item",
        },
        radar: {
          indicator: [
            { name: "PIB", max: 5 },
            { name: "Inflación", max: 10 },
            { name: "Desempleo", max: 10 },
          ],
          axisName: {
            color: "hsl(var(--muted-foreground))",
          },
          splitLine: {
            lineStyle: {
              color: "hsl(var(--border))",
            },
          },
          splitArea: {
            show: false,
          },
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [
                  predictionData.factors.gdp,
                  predictionData.factors.inflation,
                  predictionData.factors.unemployment,
                ],
                name: "Factores Actuales",
                areaStyle: {
                  color: {
                    type: "radial",
                    colorStops: [
                      { offset: 0, color: "hsla(var(--chart-1), 0.5)" },
                      { offset: 1, color: "hsla(var(--chart-1), 0.1)" },
                    ],
                  },
                },
                itemStyle: {
                  color: "hsl(var(--chart-1))",
                },
                lineStyle: {
                  color: "hsl(var(--chart-1))",
                },
              },
            ],
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Consumo Predictivo</h1>
          <p className="text-lg text-muted-foreground">
            Utiliza nuestros modelos para predecir el comportamiento futuro del consumo online
          </p>
        </div>

        <div className="mb-8">
          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Crear Nueva Predicción</h3>
                    <p className="text-sm text-muted-foreground">
                      Ingresa los indicadores económicos para obtener una predicción
                    </p>
                  </div>
                </div>
                <Button size="lg" onClick={() => setModalOpen(true)} className="shadow-md">
                  <Target className="mr-2 h-5 w-5" />
                  Nueva Predicción
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {!predictionData ? (
          <Card className="shadow-lg">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Activity className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No hay predicciones aún</h3>
                <p className="text-muted-foreground mb-6">
                  Haz clic en "Nueva Predicción" para comenzar
                </p>
                <Button onClick={() => setModalOpen(true)} variant="outline">
                  Crear Primera Predicción
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center">Pedidos Predichos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-chart-1">
                      {predictionData.predictedOrders.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">unidades estimadas</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center">Nivel de Confianza</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReactECharts option={gaugeOption} style={{ height: "180px" }} />
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center">Tendencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <TrendingUp className="mx-auto mb-2 h-12 w-12 text-chart-1" />
                      <p className="text-lg font-semibold text-chart-1">Crecimiento Positivo</p>
                      <p className="text-sm text-muted-foreground">+12% respecto al trimestre anterior</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Análisis de Factores</CardTitle>
                <CardDescription>
                  Visualización del impacto de los indicadores económicos en la predicción
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts option={factorsChartOption} style={{ height: "400px" }} />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={() => setModalOpen(true)} variant="outline" size="lg">
                <Target className="mr-2 h-5 w-5" />
                Realizar Nueva Predicción
              </Button>
            </div>
          </div>
        )}
      </div>

      <PredictionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onPredictionComplete={handlePredictionComplete}
      />
    </div>
  );
};

export default PredictiveConsumption;
