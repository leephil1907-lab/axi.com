import { useState } from "react";
import { Link } from "react-router";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import TopBar from "@/sections/TopBar";
import { Search, Calendar, Clock, User, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "EUR/USD Analysis: ECB Decision Looms Large",
    excerpt: "The euro faces a critical test this week as the European Central Bank prepares its latest monetary policy decision. With inflation data showing mixed signals...",
    category: "Forex Analysis",
    author: "Sarah Chen",
    date: "2026-07-10",
    readTime: "5 min",
    image: "eurusd",
    trending: "up",
    tags: ["EUR/USD", "ECB", "Forex", "Technical Analysis"],
  },
  {
    id: 2,
    title: "Gold Breaks $2,700: What's Next for XAU/USD?",
    excerpt: "Gold has surged to new all-time highs as geopolitical tensions and inflation concerns drive safe-haven demand. Our technical analysis suggests...",
    category: "Commodities",
    author: "Michael Torres",
    date: "2026-07-09",
    readTime: "7 min",
    image: "gold",
    trending: "up",
    tags: ["Gold", "XAU/USD", "Commodities", "Safe Haven"],
  },
  {
    id: 3,
    title: "Bitcoin ETF Inflows Hit Record $500M in Single Day",
    excerpt: "Institutional adoption of Bitcoin continues to accelerate as spot ETFs see unprecedented inflows. This marks a significant milestone for the crypto market...",
    category: "Crypto",
    author: "Alex Kim",
    date: "2026-07-08",
    readTime: "4 min",
    image: "bitcoin",
    trending: "up",
    tags: ["Bitcoin", "ETF", "Crypto", "Institutional"],
  },
  {
    id: 4,
    title: "Fed Chair Powell Speech: Market Expectations",
    excerpt: "Markets are pricing in a dovish pivot from the Federal Reserve. We break down what traders should watch for in tomorrow's speech and how it could impact...",
    category: "Market News",
    author: "Emma Williams",
    date: "2026-07-07",
    readTime: "6 min",
    image: "fed",
    trending: "down",
    tags: ["Fed", "USD", "Interest Rates", "Macro"],
  },
  {
    id: 5,
    title: "OPEC+ Maintains Production Cuts: Oil Market Outlook",
    excerpt: "Crude oil prices found support as OPEC+ members agreed to maintain current production cuts through Q3 2026. The decision reflects concerns about...",
    category: "Commodities",
    author: "David Patel",
    date: "2026-07-06",
    readTime: "5 min",
    image: "oil",
    trending: "up",
    tags: ["Oil", "OPEC", "Commodities", "Energy"],
  },
  {
    id: 6,
    title: "GBP/USD Under Pressure as BoE Signals Dovish Pivot",
    excerpt: "The British pound weakened against the dollar as the Bank of England hinted at potential rate cuts. Technical levels to watch include...",
    category: "Forex Analysis",
    author: "Sarah Chen",
    date: "2026-07-05",
    readTime: "5 min",
    image: "gbpusd",
    trending: "down",
    tags: ["GBP/USD", "BoE", "Forex", "Technical"],
  },
];

const categories = ["All", "Forex Analysis", "Crypto", "Commodities", "Market News", "Education", "Trading Strategy"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts[0];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <TopBar /><Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Market Insights & Analysis</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">Expert analysis, market updates, and trading strategies from our team of professional analysts.</p>
          </div>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#D51820]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Post */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-12">
          <div className="grid grid-cols-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#D51820] text-white text-xs px-3 py-1 rounded-full font-semibold">FEATURED</span>
                <span className="text-gray-400 text-sm">{featured.category}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{featured.title}</h2>
              <p className="text-gray-400 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featured.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featured.readTime}</span>
              </div>
              <Link to={`/blog/${featured.id}`} className="inline-flex items-center gap-2 text-[#D51820] font-semibold mt-4 hover:underline">
                Read Analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gray-100 flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-300">{featured.image.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-[#D51820] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filtered.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-300">{post.image.toUpperCase()}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#D51820] font-semibold">{post.category}</span>
                  {post.trending === "up" ? <TrendingUp className="w-3 h-3 text-green-500" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
