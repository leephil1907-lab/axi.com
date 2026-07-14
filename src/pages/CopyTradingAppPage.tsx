import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CopyTradingAppPage() {
  return (
    <Layout>
      <SEOHead title="Copy Trading App | Axi Trading" description="Copy successful traders automatically with the Axi Copy Trading App." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Copy Trading App</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Automatically copy the trades of successful traders. Filter by risk tolerance, performance, and asset class. Available on iOS and Android.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
