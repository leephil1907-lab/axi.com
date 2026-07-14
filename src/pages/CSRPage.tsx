import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CSRPage() {
  return (
    <Layout>
      <SEOHead title="Corporate Social Responsibility | Axi Trading" description="Axi CSR initiatives - Giving back to communities worldwide." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Corporate Social Responsibility</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Our commitment to corporate social responsibility includes environmental sustainability, community support, and ethical business practices across all our operations.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
