import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AffiliateProgramPage() {
  return (
    <Layout>
      <SEOHead title="Affiliate Program | Axi Trading" description="Axi Affiliate Program - Earn up to $600 per qualified trader." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Affiliate Program</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Promote Axi and earn up to $600 per qualified trader. Access marketing banners, tracking links, and detailed analytics. Monthly payouts via multiple methods.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
