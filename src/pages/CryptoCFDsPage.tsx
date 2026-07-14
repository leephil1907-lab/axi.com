import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CryptoCFDsPage() {
  return (
    <Layout>
      <SEOHead title="Crypto CFDs | Axi Trading" description="Trade cryptocurrency CFDs with Axi. Bitcoin, Ethereum, and more with leverage up to 1:200." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Crypto CFDs</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Trade popular cryptocurrencies including Bitcoin, Ethereum, Ripple, and Litecoin as CFDs. No wallet required, trade with leverage up to 1:200.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
