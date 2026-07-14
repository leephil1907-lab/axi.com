import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { trpc } from "@/providers/trpc";

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const { data: analytics } = trpc.admin.analytics.useQuery(undefined, { enabled: isAdmin });

  if (!isAdmin) return null;

  return (
    <Layout>
      <SEOHead title="Admin Dashboard | Axi Trading" description="Admin panel for Axi trading platform" />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics?.counts?.users || 0}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Accounts</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics?.counts?.accounts || 0}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Open Positions</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics?.counts?.openPositions || 0}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Pending Orders</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics?.counts?.pendingOrders || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
