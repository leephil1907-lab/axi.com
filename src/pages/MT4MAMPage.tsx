import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function MT4MAMPage() {
  return (
    <Layout>
      <SEOHead title="MT4 Multi-Account Manager | Axi Trading" description="MAM account management with Axi MT4. Professional money management tools." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">MT4 Multi-Account Manager</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Multi-Account Manager for professional traders and fund managers. Execute trades across multiple accounts simultaneously with flexible allocation methods.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
