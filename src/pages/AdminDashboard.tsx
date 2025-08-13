import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const getPendingQuotesCount = async () => {
  const { count, error } = await supabase
    .from("quotes")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");
  if (error) throw error;
  return count ?? 0;
};

const getServicesCount = async () => {
  const { count, error } = await supabase
    .from("services")
    .select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
};

const getCustomersCount = async () => {
  const { count, error } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
};

const getUpcomingBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("id, scheduled_date, scheduled_time, status")
    .gte("scheduled_date", new Date().toISOString().slice(0, 10))
    .order("scheduled_date", { ascending: true })
    .limit(5);
  if (error) throw error;
  return data ?? [];
};

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard | Fix it Right";
  }, []);

  const { data: pendingQuotes = 0 } = useQuery({
    queryKey: ["admin", "counts", "quotes", "pending"],
    queryFn: getPendingQuotesCount,
  });

  const { data: servicesCount = 0 } = useQuery({
    queryKey: ["admin", "counts", "services"],
    queryFn: getServicesCount,
  });

  const { data: customersCount = 0 } = useQuery({
    queryKey: ["admin", "counts", "profiles"],
    queryFn: getCustomersCount,
  });

  const { data: upcoming = [] } = useQuery({
    queryKey: ["admin", "upcoming-bookings"],
    queryFn: getUpcomingBookings,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage quotes, jobs, services, and customers.</p>
      </header>

      <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>New Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingQuotes}</div>
            <p className="text-sm text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customersCount}</div>
            <p className="text-sm text-muted-foreground">Profiles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{servicesCount}</div>
            <p className="text-sm text-muted-foreground">Active offerings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcoming.length}</div>
            <p className="text-sm text-muted-foreground">Next 5 scheduled</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Next Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcoming.map((b) => (
                <li key={b.id} className="flex items-center justify-between border border-border rounded-md p-3">
                  <span className="text-sm text-foreground">
                    {b.scheduled_date} at {b.scheduled_time} — {b.status}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="secondary" size="sm">Manage</Button>
                  </div>
                </li>
              ))}
              {upcoming.length === 0 && (
                <div className="text-sm text-muted-foreground">No upcoming jobs.</div>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full"><Link to="/quote">Review New Quotes</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link to="/">Manage Services</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link to="/">Customer Profiles</Link></Button>
            <Button variant="outline" className="w-full" asChild><Link to="/">Work Calendar</Link></Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
