import { useState } from "react";
import { Link } from "react-router";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import TopBar from "@/sections/TopBar";
import Breadcrumb from "@/components/Breadcrumb";
import { Search, ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";

const faqCategories = [
  { id: "account", label: "Account" },
  { id: "trading", label: "Trading" },
  { id: "funds", label: "Funds" },
  { id: "security", label: "Security" },
  { id: "platform", label: "Platform" },
];

const faqs = [
  { category: "account", question: "How do I open an account?", answer: "Click Open Account and complete the 3-step registration. You will need email, password, and identity verification." },
  { category: "account", question: "What documents do I need?", answer: "Government-issued photo ID and proof of address (utility bill or bank statement from last 3 months)." },
  { category: "account", question: "How long does verification take?", answer: "Standard: 1-2 business days. Enhanced: 3-5 business days." },
  { category: "trading", question: "What is the minimum deposit?", answer: "No minimum for Standard accounts. Pro accounts require $500 minimum." },
  { category: "trading", question: "What leverage is available?", answer: "Up to 1:500 for professionals, 1:30 for retail clients under ESMA regulations." },
  { category: "trading", question: "Do you offer negative balance protection?", answer: "Yes, all retail clients have negative balance protection automatically." },
  { category: "funds", question: "How do I deposit funds?", answer: "Go to Funds > Deposit, select payment method, and follow instructions. Most deposits are instant." },
  { category: "funds", question: "What payment methods are accepted?", answer: "Cards, bank transfers, Skrill, Neteller, crypto, Google Pay, and Binance Pay." },
  { category: "funds", question: "How long do withdrawals take?", answer: "Cards: 1-3 days. Bank transfers: 3-5 days. E-wallets: within 24 hours." },
  { category: "security", question: "Is my money safe?", answer: "Yes. Client funds are held in segregated accounts with tier-1 banks. We are regulated by FCA, ASIC, and FMA." },
  { category: "security", question: "Do you offer two-factor authentication?", answer: "Yes, 2FA is available via SMS, email, or authenticator apps. We strongly recommend enabling it." },
  { category: "platform", question: "What platforms do you support?", answer: "Axi Trading Platform (web and mobile), MetaTrader 4, and MetaTrader 5." },
  { category: "platform", question: "Can I use Expert Advisors?", answer: "Yes, MT4 and MT5 fully support Expert Advisors and automated trading strategies." },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <TopBar />
      <Navbar />

      <div className="pt-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about trading with Axi
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D51820] focus:border-transparent text-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-[#D51820] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#D51820] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#D51820] to-red-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-white/80 mb-6">Our support team is available 24/7</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@axi-trading.com" className="bg-white text-[#D51820] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Support
            </a>
            <a href="tel:+18008888888" className="bg-white/20 border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
