import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function FreeEBooksPage() {
  return (
    <Layout>
      <SEOHead title="Free eBooks | Axi Trading" description="Download free trading eBooks from Axi. Learn forex, crypto, and risk management." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Free eBooks</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Download our library of free trading eBooks. Covers forex fundamentals, technical analysis, risk management strategies, and advanced trading techniques.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
