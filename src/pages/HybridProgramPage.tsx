import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function HybridProgramPage() {
  return (
    <Layout>
      <SEOHead title="Hybrid Program | Axi Trading" description="Axi Hybrid Program - Combine CPA and revenue share commissions." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Hybrid Program</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Our Hybrid program combines upfront CPA payments with ongoing revenue share. Maximize your earnings with the best of both partnership models.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
