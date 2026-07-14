import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AIAnalystPage() {
  return (
    <Layout>
      <SEOHead title="AI Analyst | Axi Trading" description="AI-powered market analysis and trading insights from Axi." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">AI Analyst</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Get AI-powered market analysis, trading signals, and personalized insights. Our AI Analyst scans markets 24/7 to identify opportunities.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
