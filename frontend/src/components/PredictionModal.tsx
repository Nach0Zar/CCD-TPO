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

const PredictionModal = ({ open, onOpenChange, onPredictionComplete }: PredictionModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    country: "",
    gdp: "",
    inflation: "",
    unemployment: "",
    quarter: "",
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
        country: "",
        gdp: "",
        inflation: "",
        unemployment: "",
        quarter: "",
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
            <Label htmlFor="country">País</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
              required
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mexico">México</SelectItem>
                <SelectItem value="argentina">Argentina</SelectItem>
                <SelectItem value="chile">Chile</SelectItem>
                <SelectItem value="colombia">Colombia</SelectItem>
                <SelectItem value="peru">Perú</SelectItem>
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
              <Label htmlFor="quarter">Trimestre</Label>
              <Select
                value={formData.quarter}
                onValueChange={(value) => setFormData({ ...formData, quarter: value })}
                required
              >
                <SelectTrigger id="quarter">
                  <SelectValue placeholder="Q1, Q2..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1">Q1 2024</SelectItem>
                  <SelectItem value="q2">Q2 2024</SelectItem>
                  <SelectItem value="q3">Q3 2024</SelectItem>
                  <SelectItem value="q4">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
