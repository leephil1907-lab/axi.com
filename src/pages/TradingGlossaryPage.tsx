import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function TradingGlossaryPage() {
  return (
    <Layout>
      <SEOHead title="Trading Glossary | Axi Trading" description="Complete trading terminology glossary from Axi. Understand every trading term." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Trading Glossary</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Comprehensive glossary of trading terms and definitions. From basic concepts like pips and spreads to advanced technical indicators and order types.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
