import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  hourly_rate: number | null;
  base_fee: number | null;
  materials_markup_percent: number | null;
}

const Estimator = () => {
  useEffect(() => {
    document.title = "Cost Estimator | Fix it Right";
  }, []);

  const { data: services } = useQuery({
    queryKey: ["services", "estimator"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, hourly_rate, base_fee, materials_markup_percent")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return data as Service[];
    },
  });

  const [serviceId, setServiceId] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(2);
  const [materials, setMaterials] = useState<number>(50);

  const selected = useMemo(() => (services ?? []).find((s) => s.id === serviceId), [services, serviceId]);

  const estimate = useMemo(() => {
    if (!selected) return 0;
    const hourly = selected.hourly_rate ?? 0;
    const base = selected.base_fee ?? 0;
    const markup = (selected.materials_markup_percent ?? 0) / 100;
    const total = base + hourly * hours + Math.round(materials * 100 * (1 + markup));
    return total; // in cents
  }, [selected, hours, materials]);

  return (
    <main className="min-h-screen bg-background">
      <header className="container mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Cost Estimator</h1>
        <p className="text-muted-foreground mt-1">Estimate a job before requesting a quote.</p>
      </header>

      <section className="container mx-auto max-w-3xl p-6 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Estimate Your Job</CardTitle>
            <CardDescription>Select a service and adjust inputs.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Service</label>
              <Select value={serviceId ?? undefined} onValueChange={setServiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {(services ?? []).map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Hours</label>
                <Input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm font-medium">Materials (USD)</label>
                <Input type="number" value={materials} onChange={(e) => setMaterials(Number(e.target.value))} />
              </div>
              <div className="flex items-end">
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Total</div>
                  <div className="text-2xl font-semibold">${(estimate / 100).toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => (window.location.href = "/quote")}>Request Custom Quote</Button>
              <Button onClick={() => (window.location.href = "/calendar")}>Schedule from Calendar</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Estimator;
