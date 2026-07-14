import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function EliteAccountPage() {
  return (
    <Layout>
      <SEOHead title="Elite Account | Axi Trading" description="Axi Elite Account - VIP trading with premium benefits and dedicated support." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Elite Account</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Our premium account for high-volume traders. Minimum balance $25,000. Enjoy raw spreads, reduced commissions, VPS hosting, and dedicated account manager.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
