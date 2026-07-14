import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function CareersPage() {
  return (
    <Layout>
      <SEOHead title="Careers at Axi | Axi Trading" description="Join the Axi team. Exciting career opportunities in fintech." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Careers at Axi</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Join a dynamic team at the forefront of fintech innovation. We offer competitive salaries, flexible working, and opportunities for growth across our global offices.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
