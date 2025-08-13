import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  name: string;
  description: string | null;
  unit: string | null;
  is_active: boolean | null;
  min_price: number | null;
  max_price: number | null;
  hourly_rate: number | null;
  base_fee: number | null;
  materials_markup_percent: number | null;
}

const ServicesManager = () => {
  const { role, user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  useEffect(() => {
    document.title = "Services Manager | Fix it Right";
  }, []);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, description, unit, is_active, min_price, max_price, hourly_rate, base_fee, materials_markup_percent")
        .order("name");
      if (error) throw error;
      return data as Service[];
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (payload: Partial<Service>) => {
      const { id, ...rest } = payload;
      if (id) {
        const { data, error } = await supabase
          .from("services")
          .update(rest as any)
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        return data as Service;
      } else {
        if (!rest.name || !rest.name.trim()) throw new Error("Name is required");
        const { data, error } = await supabase
          .from("services")
          .insert(rest as any)
          .select()
          .single();
        if (error) throw error;
        return data as Service;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Saved", description: "Service saved successfully." });
      setOpen(false);
      setEditing(null);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message });
    },
  });

  const toggleActive = useMutation({
    mutationFn: async (svc: Service) => {
      const { error } = await supabase.from("services").update({ is_active: !svc.is_active }).eq("id", svc.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message }),
  });

  const [form, setForm] = useState<Partial<Service>>({
    name: "",
    description: "",
    unit: "hour",
    is_active: true,
    min_price: null,
    max_price: null,
    hourly_rate: 8000,
    base_fee: 2500,
    materials_markup_percent: 15,
  });

  const startCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      unit: "hour",
      is_active: true,
      min_price: null,
      max_price: null,
      hourly_rate: 8000,
      base_fee: 2500,
      materials_markup_percent: 15,
    });
    setOpen(true);
  };

  const startEdit = (svc: Service) => {
    setEditing(svc);
    setForm(svc);
    setOpen(true);
  };

  const canEdit = useMemo(() => role === "admin", [role]);

  if (user && !canEdit) {
    return (
      <main className="min-h-screen bg-background">
        <section className="container mx-auto max-w-5xl p-6">
          <Card>
            <CardHeader>
              <CardTitle>Unauthorized</CardTitle>
              <CardDescription>You need admin access to manage services.</CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Services Manager</h1>
        <p className="text-muted-foreground mt-1">Create and maintain services, rates, and markups.</p>
      </header>
      <section className="container mx-auto max-w-5xl p-6 pt-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Services</CardTitle>
              <CardDescription>Active services are visible to customers.</CardDescription>
            </div>
            <Button onClick={startCreate}>New Service</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Hourly Rate</TableHead>
                    <TableHead>Base Fee</TableHead>
                    <TableHead>Materials Markup %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">Loading services…</TableCell>
                    </TableRow>
                  ) : services && services.length > 0 ? (
                    services.map((svc) => (
                      <TableRow key={svc.id}>
                        <TableCell className="font-medium">{svc.name}</TableCell>
                        <TableCell>{svc.unit ?? "-"}</TableCell>
                        <TableCell>{svc.hourly_rate != null ? `$${(svc.hourly_rate / 100).toFixed(2)}` : "-"}</TableCell>
                        <TableCell>{svc.base_fee != null ? `$${(svc.base_fee / 100).toFixed(2)}` : "-"}</TableCell>
                        <TableCell>{svc.materials_markup_percent ?? 0}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch checked={!!svc.is_active} onCheckedChange={() => toggleActive.mutate(svc)} />
                            <span className="text-sm text-muted-foreground">{svc.is_active ? "Active" : "Hidden"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => startEdit(svc)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">No services yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Service" : "New Service"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name ?? ""} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" value={form.unit ?? ""} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
              <Input id="hourly_rate" type="number" value={(form.hourly_rate ?? 0) / 100}
                     onChange={(e) => setForm((f) => ({ ...f, hourly_rate: Math.round(Number(e.target.value) * 100) }))} />
            </div>
            <div>
              <Label htmlFor="base_fee">Base Fee (USD)</Label>
              <Input id="base_fee" type="number" value={(form.base_fee ?? 0) / 100}
                     onChange={(e) => setForm((f) => ({ ...f, base_fee: Math.round(Number(e.target.value) * 100) }))} />
            </div>
            <div>
              <Label htmlFor="materials_markup_percent">Materials Markup %</Label>
              <Input id="materials_markup_percent" type="number" value={form.materials_markup_percent ?? 0}
                     onChange={(e) => setForm((f) => ({ ...f, materials_markup_percent: Number(e.target.value) }))} />
            </div>
            <div>
              <Label htmlFor="min_price">Min Price (USD)</Label>
              <Input id="min_price" type="number" value={(form.min_price ?? 0) / 100}
                     onChange={(e) => setForm((f) => ({ ...f, min_price: Math.round(Number(e.target.value) * 100) }))} />
            </div>
            <div>
              <Label htmlFor="max_price">Max Price (USD)</Label>
              <Input id="max_price" type="number" value={(form.max_price ?? 0) / 100}
                     onChange={(e) => setForm((f) => ({ ...f, max_price: Math.round(Number(e.target.value) * 100) }))} />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Switch checked={!!form.is_active} onCheckedChange={(val) => setForm((f) => ({ ...f, is_active: val }))} />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => upsertMutation.mutate(form)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ServicesManager;
