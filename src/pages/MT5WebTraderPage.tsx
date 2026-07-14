import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function MT5WebTraderPage() {
  return (
    <Layout>
      <SEOHead title="MT5 WebTrader | Axi Trading" description="Trade directly from your browser with MT5 WebTrader. Advanced charting and analysis." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">MT5 WebTrader</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Access MetaTrader 5 directly from your browser. Enhanced charting, more timeframes, and advanced order types - all without installation.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
