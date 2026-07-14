import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function DemoAccountPage() {
  return (
    <Layout>
      <SEOHead title="Demo Account | Axi Trading" description="Practice trading risk-free with an Axi demo account. $50,000 virtual funds." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Demo Account</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Practice trading with $50,000 in virtual funds. Test strategies, learn the platform, and build confidence before trading with real money. Available for 30 days.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
