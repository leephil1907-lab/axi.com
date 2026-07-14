import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AboutAxiPage() {
  return (
    <Layout>
      <SEOHead title="About Axi | Axi Trading" description="Learn about Axi - Global CFD and forex broker since 2007." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Axi</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Founded in 2007 in Sydney, Axi has grown to become a leading global broker. Regulated by FCA, ASIC, FMA, and DFSA. Serving traders in 100+ countries with award-winning platforms and support.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
