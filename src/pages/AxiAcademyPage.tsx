import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AxiAcademyPage() {
  return (
    <Layout>
      <SEOHead title="Axi Academy | Axi Trading" description="Learn to trade with Axi Academy. Free courses, quizzes, and certifications." />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Axi Academy</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600">Axi Academy offers free structured courses for traders of all levels. Interactive quizzes, video lessons, and completion certificates to track your progress.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
