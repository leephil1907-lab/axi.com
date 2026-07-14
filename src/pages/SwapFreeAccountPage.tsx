import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function SwapFreeAccountPage() {
  return (
    <Layout>
      <SEOHead title="Swap-Free Account | Axi Trading" description="Islamic swap-free trading account with Axi. Shariah-compliant." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Swap-Free Account</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Shariah-compliant trading account with no swap or rollover interest. Ideal for traders who cannot receive or pay interest due to religious beliefs. Same trading conditions as standard accounts.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
