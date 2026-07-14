import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AxiTradingPlatformPage() {
  return (
    <Layout>
      <SEOHead title="Axi Trading Platform | Axi Trading" description="Experience the new Axi Trading Platform. Trade 650+ markets from one app." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Axi Trading Platform</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Our next-generation trading platform gives you access to 650+ markets including forex, crypto, commodities, share CFDs, ETFs and global indices - all from one intuitive app.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
