import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function IPOsPage() {
  return (
    <Layout>
      <SEOHead title="IPO Trading | Axi Trading" description="Trade IPOs with Axi. Access initial public offerings and new market listings." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">IPO Trading</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Get access to the latest IPOs and new market listings. Trade shares of companies going public with competitive spreads and zero commission on standard accounts.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
