import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function MT4VideoTutorialsPage() {
  return (
    <Layout>
      <SEOHead title="MT4 Video Tutorials | Axi Trading" description="Free MetaTrader 4 video tutorials from Axi. Learn to trade step by step." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">MT4 Video Tutorials</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Learn MetaTrader 4 with our comprehensive video tutorial series. From basic navigation to advanced charting and automated trading with Expert Advisors.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
