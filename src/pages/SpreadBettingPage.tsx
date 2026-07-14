import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function SpreadBettingPage() {
  return (
    <Layout>
      <SEOHead title="Spread Betting | Axi Trading" description="Tax-efficient spread betting with Axi. Available for UK and Ireland clients." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Spread Betting</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Tax-efficient trading available exclusively for UK and Ireland residents. No capital gains tax on profits. Trade forex, indices, and commodities via spread betting.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
