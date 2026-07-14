import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function MT4PAMMPage() {
  return (
    <Layout>
      <SEOHead title="MT4 PAMM Manager | Axi Trading" description="PAMM account management with Axi MT4. Manage multiple investor accounts." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">MT4 PAMM Manager</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Percentage Allocation Management Module for professional money managers. Trade on behalf of multiple investors with automated profit distribution.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
