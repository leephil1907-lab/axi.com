import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function OurPurposePage() {
  return (
    <Layout>
      <SEOHead title="Our Purpose | Axi Trading" description="The Axi purpose - Empowering traders worldwide since 2007." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Purpose</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Our purpose is to empower traders worldwide with transparent, fair, and innovative trading solutions. We believe everyone deserves access to global financial markets.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
