import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function SponsorshipPage() {
  return (
    <Layout>
      <SEOHead title="Sponsorship | Axi Trading" description="Axi sponsorships - Manchester City FC and global sports partnerships." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Sponsorship</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Proud sponsor of Manchester City FC and other global sports partnerships. We believe in excellence, teamwork, and performance - on and off the trading floor.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
