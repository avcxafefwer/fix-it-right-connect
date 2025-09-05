import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";

const Dashboard = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard | Fix it Right";
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading your dashboard…</div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background">
      {role === "admin" ? <AdminDashboard /> : <CustomerDashboard />}
    </main>
  );
};

export default Dashboard;
