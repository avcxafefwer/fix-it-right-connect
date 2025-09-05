import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const getMyCounts = async () => {
  const [{ count: myQuotes }, { count: myBookings }] = await Promise.all([
    supabase.from("quotes").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
  ]);
  return { quotes: myQuotes ?? 0, bookings: myBookings ?? 0 };
};

const getNextMyBooking = async () => {
  const { data } = await supabase
    .from("bookings")
    .select("id, scheduled_date, scheduled_time, status")
    .gte("scheduled_date", new Date().toISOString().slice(0, 10))
    .order("scheduled_date", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data ?? null;
};

const CustomerDashboard = () => {
  useEffect(() => {
    document.title = "My Dashboard | Fix it Right";
  }, []);

  const { data: counts } = useQuery({ queryKey: ["customer", "counts"], queryFn: getMyCounts });
  const { data: nextBooking } = useQuery({ queryKey: ["customer", "next-booking"], queryFn: getNextMyBooking });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground">Track your requests and schedule new work.</p>
      </header>

      <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>My Quotes</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts?.quotes ?? 0}</div>
            <p className="text-sm text-muted-foreground">Submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>My Jobs</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{counts?.bookings ?? 0}</div>
            <p className="text-sm text-muted-foreground">Scheduled or pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Next Appointment</CardTitle></CardHeader>
          <CardContent>
            {nextBooking ? (
              <div className="text-sm text-foreground">
                {nextBooking.scheduled_date} at {nextBooking.scheduled_time} — {nextBooking.status}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No upcoming appointment.</div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Request a Custom Quote</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Describe your project and preferred schedule.</p>
            <Button asChild><Link to="/quote">Start Quote</Link></Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Order Services</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Browse common handyman tasks and get instant estimates.</p>
            <Button variant="outline" asChild><a href="/#services">Browse Services</a></Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CustomerDashboard;
