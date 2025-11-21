import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, LineChart, Database, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bTAgNDhjLTYuNjI3IDAtMTItNS4zNzMtMTItMTJzNS4zNzMtMTIgMTItMTIgMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
              Predice el Futuro del E-Commerce
            </h1>
            <p className="mb-8 text-xl text-primary-foreground/90">
              En PulseCommerce demostramos que los cambios en la economía tienen un impacto directo en el comportamiento del e-commerce, y que este patrón puede predecirse mediante el análisis de datos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/predictive")}
                className="shadow-lg hover:shadow-xl transition-all"
              >
                <Target className="mr-2 h-5 w-5" />
                Hacer Predicción
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/historic")}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
              >
                <LineChart className="mr-2 h-5 w-5" />
                Ver Datos Históricos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hypothesis Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-center">Nuestra Hipótesis</h2>
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Durante los periodos de <span className="font-semibold text-foreground">crecimiento económico</span> (PIB en alza, baja inflación y desempleo), aumenta la cantidad de pedidos online; en cambio, durante <span className="font-semibold text-foreground">recesiones o alta inflación</span>, la demanda tiende a contraerse.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Este conocimiento permite a las empresas <span className="font-semibold text-foreground">anticipar la demanda</span>, ajustar precios, gestionar inventarios y optimizar campañas digitales con base en datos reales y contexto macroeconómico.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold text-center">¿Qué Ofrecemos?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-chart-1 to-chart-4">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Datos Históricos</CardTitle>
                <CardDescription>
                  Visualiza patrones históricos de consumo y su correlación con indicadores económicos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-chart-2 to-chart-5">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Predicciones Precisas</CardTitle>
                <CardDescription>
                  Utiliza nuestros modelos para predecir el comportamiento futuro del consumo online
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-chart-3 to-chart-1">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Análisis Contextual</CardTitle>
                <CardDescription>
                  Comprende cómo el contexto macroeconómico afecta el comportamiento de compra
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">
              Comienza a Predecir Ahora
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Aprovecha el poder del análisis de datos para tomar decisiones más informadas en tu negocio de e-commerce
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/predictive")}
              className="shadow-lg hover:shadow-xl transition-all"
            >
              <Target className="mr-2 h-5 w-5" />
              Hacer Tu Primera Predicción
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
