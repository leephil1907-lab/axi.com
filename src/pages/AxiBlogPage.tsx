import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AxiBlogPage() {
  return (
    <Layout>
      <SEOHead title="Axi Blog | Axi Trading" description="Latest market insights, trading tips, and industry news from Axi." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Axi Blog</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Stay updated with the latest market analysis, trading strategies, and industry news. Our expert team provides daily insights across forex, crypto, and commodities.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
