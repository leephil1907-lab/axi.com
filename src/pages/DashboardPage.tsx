import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <SEOHead title="Dashboard | Axi Trading" description="Your Axi trading dashboard" />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {user?.name || user?.email}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Account Balance</h3>
              <p className="text-3xl font-bold text-[#D51820]">$10,000.00</p>
              <p className="text-sm text-gray-500 mt-1">Demo Account</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Open Positions</h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500 mt-1">No active trades</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total P&L</h3>
              <p className="text-3xl font-bold text-green-600">+$0.00</p>
              <p className="text-sm text-gray-500 mt-1">Today</p>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <a href="/trading" className="bg-[#D51820] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Start Trading</a>
            <a href="/deposit" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Deposit</a>
            <a href="/withdrawal" className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Withdraw</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
