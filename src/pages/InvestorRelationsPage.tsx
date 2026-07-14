import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function InvestorRelationsPage() {
  return (
    <Layout>
      <SEOHead title="Investor Relations | Axi Trading" description="Axi investor relations - Financial reports and company information." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Investor Relations</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Access financial reports, annual statements, and corporate governance information. AxiCorp Financial Services Pty Limited is committed to transparency.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
