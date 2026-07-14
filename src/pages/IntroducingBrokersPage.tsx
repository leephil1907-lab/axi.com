import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function IntroducingBrokersPage() {
  return (
    <Layout>
      <SEOHead title="Introducing Brokers | Axi Trading" description="Become an Axi Introducing Broker. Earn commissions referring traders." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Introducing Brokers</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Join our Introducing Broker program and earn competitive commissions for every trader you refer. Dedicated support, marketing materials, and real-time reporting.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
