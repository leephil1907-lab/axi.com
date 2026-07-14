import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CryptoGlossaryPage() {
  return (
    <Layout>
      <SEOHead title="Crypto Glossary | Axi Trading" description="Cryptocurrency terminology glossary from Axi. Learn crypto trading terms." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Crypto Glossary</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Essential cryptocurrency and blockchain terminology. Understand DeFi, NFTs, staking, mining, and all the key concepts in the crypto space.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
