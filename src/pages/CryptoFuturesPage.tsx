import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CryptoFuturesPage() {
  return (
    <Layout>
      <SEOHead title="Crypto Futures | Axi Trading" description="Trade crypto futures with Axi. Access perpetual contracts and futures markets." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Crypto Futures</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Access cryptocurrency futures markets with competitive margin requirements. Trade perpetual contracts on major crypto pairs.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
