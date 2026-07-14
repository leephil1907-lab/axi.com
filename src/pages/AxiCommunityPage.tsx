import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AxiCommunityPage() {
  return (
    <Layout>
      <SEOHead title="Axi Community | Axi Trading" description="Join the Axi trading community. Connect with traders worldwide." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Axi Community</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Connect with traders worldwide through our community forums, social channels, and events. Share strategies, get insights, and grow together.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
