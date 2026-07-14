import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CompanyNewsPage() {
  return (
    <Layout>
      <SEOHead title="Company News | Axi Trading" description="Latest news and updates from Axi. Product launches and announcements." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Company News</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Stay informed with the latest Axi news, product updates, platform enhancements, and corporate announcements. Subscribe to our press releases.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
