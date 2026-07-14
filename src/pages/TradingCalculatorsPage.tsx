import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function TradingCalculatorsPage() {
  return (
    <Layout>
      <SEOHead title="Trading Calculators | Axi Trading" description="Free trading calculators from Axi. Pip, margin, and profit calculators." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Trading Calculators</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Use our free trading calculators to plan your trades. Includes pip calculator, margin calculator, profit/loss calculator, and currency converter.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
