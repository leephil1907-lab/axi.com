import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function BuyCryptoPage() {
  return (
    <Layout>
      <SEOHead title="Buy Crypto | Axi Trading" description="Buy and sell cryptocurrencies directly with Axi. Own your crypto assets." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Buy Crypto</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Buy, sell, and hold actual cryptocurrencies. Secure storage, instant execution, and competitive pricing on all major digital assets.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
