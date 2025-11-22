import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPredictionComplete: (data: PredictionResult) => void;
}

export interface PredictionResult {
  predictedOrders: number;
  confidence: number;
  factors: {
    gdp: number;
    inflation: number;
    unemployment: number;
  };
}

const brazilStates = [
  { value: "all", label: "Todas" },
  { value: "acre", label: "Acre" },
  { value: "alagoas", label: "Alagoas" },
  { value: "amapa", label: "Amapa" },
  { value: "amazonas", label: "Amazonas" },
  { value: "bahia", label: "Bahia" },
  { value: "ceara", label: "Ceara" },
  { value: "distrito-federal", label: "Distrito Federal" },
  { value: "espirito-santo", label: "Espirito Santo" },
  { value: "goias", label: "Goias" },
  { value: "maranhao", label: "Maranhao" },
  { value: "mato-grosso", label: "Mato Grosso" },
  { value: "mato-grosso-do-sul", label: "Mato Grosso do Sul" },
  { value: "minas-gerais", label: "Minas Gerais" },
  { value: "para", label: "Para" },
  { value: "paraiba", label: "Paraiba" },
  { value: "parana", label: "Parana" },
  { value: "pernambuco", label: "Pernambuco" },
  { value: "piaui", label: "Piaui" },
  { value: "rio-de-janeiro", label: "Rio de Janeiro" },
  { value: "rio-grande-do-norte", label: "Rio Grande do Norte" },
  { value: "rio-grande-do-sul", label: "Rio Grande do Sul" },
  { value: "rondonia", label: "Rondonia" },
  { value: "roraima", label: "Roraima" },
  { value: "santa-catarina", label: "Santa Catarina" },
  { value: "sao-paulo", label: "Sao Paulo" },
  { value: "sergipe", label: "Sergipe" },
  { value: "tocantins", label: "Tocantins" },
];

const consumptionCategories = [
  { value: "all", label: "Todas" },
  { value: "electronics", label: "Electronica" },
  { value: "fashion", label: "Moda" },
  { value: "home", label: "Hogar" },
  { value: "beauty", label: "Belleza" },
  { value: "sports", label: "Deportes" },
];

const forecastYears = ["2026", "2027", "2028", "2029", "2030"];

const PredictionModal = ({ open, onOpenChange, onPredictionComplete }: PredictionModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    state: "",
    category: "",
    year: "",
    gdp: "",
    inflation: "",
    unemployment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockPrediction: PredictionResult = {
        predictedOrders: Math.floor(Math.random() * 1000) + 2000,
        confidence: 0.85 + Math.random() * 0.1,
        factors: {
          gdp: parseFloat(formData.gdp) || 0,
          inflation: parseFloat(formData.inflation) || 0,
          unemployment: parseFloat(formData.unemployment) || 0,
        },
      };

      onPredictionComplete(mockPrediction);
      setLoading(false);
      onOpenChange(false);
      
      toast({
        title: "Predicción Completada",
        description: "Los resultados se muestran en los gráficos a continuación",
      });

      // Reset form
      setFormData({
        state: "",
        category: "",
        year: "",
        gdp: "",
        inflation: "",
        unemployment: "",
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Predicción de Consumo</DialogTitle>
          <DialogDescription>
            Ingresa los indicadores económicos para predecir el comportamiento del e-commerce
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value })}
              required
            >
              <SelectTrigger id="state">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {brazilStates.map((state) => <SelectItem value={state.value}>{state.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gdp">PIB (% crecimiento)</Label>
              <Input
                id="gdp"
                type="number"
                step="0.1"
                placeholder="2.5"
                value={formData.gdp}
                onChange={(e) => setFormData({ ...formData, gdp: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inflation">Inflación (%)</Label>
              <Input
                id="inflation"
                type="number"
                step="0.1"
                placeholder="3.5"
                value={formData.inflation}
                onChange={(e) => setFormData({ ...formData, inflation: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unemployment">Desempleo (%)</Label>
              <Input
                id="unemployment"
                type="number"
                step="0.1"
                placeholder="4.2"
                value={formData.unemployment}
                onChange={(e) => setFormData({ ...formData, unemployment: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quarter">Año</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => setFormData({ ...formData, year: value })}
                required
              >
                <SelectTrigger id="quarter">
                  <SelectValue placeholder="2025, 2026..." />
                </SelectTrigger>
                <SelectContent>
                  {forecastYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                {consumptionCategories.map((category) => <SelectItem value={category.value}>{category.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Calculando..." : "Generar Predicción"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionModal;
