import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Booking {
  id: string;
  scheduled_date: string; // YYYY-MM-DD
  scheduled_time: string; // HH:MM:SS
  status: string | null;
  service_id: string | null;
  user_id: string | null;
}

interface Service { id: string; name: string }

const startHour = 9;
const endHour = 17; // exclusive end
const slots = Array.from({ length: endHour - startHour }, (_, i) => `${String(startHour + i).padStart(2, "0")}:00:00`);

function toTimeLabel(t: string) {
  const [h, m] = t.split(":");
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hr12 = ((hour + 11) % 12) + 1;
  return `${hr12}:${m} ${ampm}`;
}

const WorkCalendar = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [date, setDate] = useState<Date>(new Date());
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newTime, setNewTime] = useState<string>(slots[0]);
  const [createOpen, setCreateOpen] = useState(false);
  const [newService, setNewService] = useState<string | null>(null);
  const [newTimeForCreate, setNewTimeForCreate] = useState<string>(slots[0]);

  useEffect(() => {
    document.title = "Work Calendar | Fix it Right";
  }, []);

  const dateStr = useMemo(() => date.toISOString().slice(0, 10), [date]);

  const { data: services } = useQuery({
    queryKey: ["services", "active"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("id, name").eq("is_active", true).order("name");
      if (error) throw error;
      return data as Service[];
    },
  });

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", dateStr],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, scheduled_date, scheduled_time, status, service_id, user_id")
        .eq("scheduled_date", dateStr)
        .order("scheduled_time");
      if (error) throw error;
      return data as Booking[];
    },
  });

  const bookingsByTime = useMemo(() => {
    const map: Record<string, Booking | undefined> = {};
    (bookings ?? []).forEach((b) => (map[b.scheduled_time] = b));
    return map;
  }, [bookings]);

  const updateMutation = useMutation({
    mutationFn: async (payload: { id: string; scheduled_date: string; scheduled_time: string }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ scheduled_date: payload.scheduled_date, scheduled_time: payload.scheduled_time })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", dateStr] });
      toast({ title: "Rescheduled", description: "Booking updated." });
      setRescheduleOpen(false);
      setSelectedBooking(null);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message }),
  });

  const createMutation = useMutation({
    mutationFn: async (payload: { scheduled_date: string; scheduled_time: string; service_id: string; user_id: string }) => {
      const { error } = await supabase
        .from("bookings")
        .insert({ ...payload, status: "pending" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings", dateStr] });
      toast({ title: "Requested", description: "Booking request submitted." });
      setCreateOpen(false);
      setNewService(null);
    },
    onError: (err: any) => toast({ title: "Error", description: err.message }),
  });

  return (
    <main className="min-h-screen bg-background">
      <header className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Work Calendar</h1>
        <p className="text-muted-foreground mt-1">View and manage scheduled jobs.</p>
      </header>

      <section className="container mx-auto max-w-5xl p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Pick a day to view slots.</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Slots for {dateStr}</CardTitle>
              <CardDescription>{isLoading ? "Loading…" : "Click a booked slot to reschedule."}</CardDescription>
            </div>
            {user && (
              <Button onClick={() => setCreateOpen(true)}>Request Booking</Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {slots.map((t) => {
                const b = bookingsByTime[t];
                const isBooked = !!b;
                return (
                  <div key={t} className={`rounded-md border p-4 ${isBooked ? "bg-muted" : "bg-background"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{toTimeLabel(t)}</div>
                        <div className="text-sm text-muted-foreground">{isBooked ? (b?.status ?? "pending") : "Available"}</div>
                      </div>
                      {isBooked ? (
                        <Button variant="outline" size="sm" onClick={() => { setSelectedBooking(b!); setNewTime(t); setRescheduleOpen(true); }}>Reschedule</Button>
                      ) : (
                        <Button variant="secondary" size="sm" onClick={() => { setCreateOpen(true); setNewTimeForCreate(t); }}>Book</Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Reschedule dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Label>New Time</Label>
            <Select value={newTime} onValueChange={setNewTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {slots.map((s) => (
                  <SelectItem key={s} value={s}>{toTimeLabel(s)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleOpen(false)}>Cancel</Button>
            <Button onClick={() => selectedBooking && updateMutation.mutate({ id: selectedBooking.id, scheduled_date: selectedBooking.scheduled_date, scheduled_time: newTime })}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create booking dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Booking</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Service</Label>
              <Select value={newService ?? undefined} onValueChange={(v) => setNewService(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {(services ?? []).map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time</Label>
              <Select value={newTimeForCreate} onValueChange={setNewTimeForCreate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {slots.map((s) => (
                    <SelectItem key={s} value={s}>{toTimeLabel(s)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button disabled={!newService || !user} onClick={() => newService && user && createMutation.mutate({ scheduled_date: dateStr, scheduled_time: newTimeForCreate, service_id: newService, user_id: user.id })}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default WorkCalendar;
