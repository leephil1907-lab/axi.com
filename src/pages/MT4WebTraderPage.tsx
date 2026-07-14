import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function MT4WebTraderPage() {
  return (
    <Layout>
      <SEOHead title="MT4 WebTrader | Axi Trading" description="Trade directly from your browser with MT4 WebTrader. No download required." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">MT4 WebTrader</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Access MetaTrader 4 directly from your web browser. Full functionality without any downloads - trade from any device, anywhere.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
