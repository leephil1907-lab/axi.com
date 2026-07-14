import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function ProAccountPage() {
  return (
    <Layout>
      <SEOHead title="Pro Account | Axi Trading" description="Axi Pro Account - Raw spreads from 0.0 pips with $7 commission per lot." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Pro Account</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Designed for active traders. Raw spreads from 0.0 pips with a flat $7 commission per round trip lot. Lower trading costs for higher volume traders.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
