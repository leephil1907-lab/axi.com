import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function StandardAccountPage() {
  return (
    <Layout>
      <SEOHead title="Standard Account | Axi Trading" description="Axi Standard Account - Commission-free trading with competitive spreads." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Standard Account</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Our most popular account type. Enjoy commission-free trading with spreads from 0.9 pips. Perfect for beginners and casual traders. No minimum deposit.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
