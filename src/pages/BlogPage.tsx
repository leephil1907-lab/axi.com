import { useState } from "react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import TopBar from "@/sections/TopBar";
import Breadcrumb from "@/components/Breadcrumb";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  { id: 1, title: "EUR/USD Analysis: Fed Decision Looms Large", excerpt: "The euro faces critical resistance ahead of this week's Federal Reserve meeting.", category: "Market Analysis", author: "Sarah Johnson", date: "2026-07-12", readTime: "5 min", trending: true },
  { id: 2, title: "Gold Hits New Record: Is $3,000 Next?", excerpt: "Gold surged to fresh all-time highs as geopolitical tensions escalate.", category: "Commodities", author: "Michael Chen", date: "2026-07-11", readTime: "4 min", trending: true },
  { id: 3, title: "Bitcoin ETF Inflows Reach $2B Monthly", excerpt: "Institutional adoption continues as spot Bitcoin ETFs see record inflows.", category: "Crypto", author: "Alex Rivera", date: "2026-07-10", readTime: "6 min", trending: false },
  { id: 4, title: "Understanding Leverage: A Beginner's Guide", excerpt: "Leverage can amplify both gains and losses. Learn how to use it responsibly.", category: "Education", author: "Emma Williams", date: "2026-07-09", readTime: "8 min", trending: false },
  { id: 5, title: "OPEC+ Meeting: Oil Price Outlook", excerpt: "Oil markets brace for the latest OPEC+ production decision.", category: "Commodities", author: "David Park", date: "2026-07-08", readTime: "5 min", trending: true },
  { id: 6, title: "Top 5 Trading Strategies for Volatile Markets", excerpt: "Discover proven strategies used by professional traders during market turbulence.", category: "Education", author: "Lisa Thompson", date: "2026-07-07", readTime: "10 min", trending: false },
];

const categories = ['All', 'Market Analysis', 'Crypto', 'Commodities', 'Forex', 'Education', 'Company News'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <TopBar />
      <Navbar />
      <Breadcrumb />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Market Insights & Analysis</h1>
          <p className="text-gray-600">Daily market analysis, trading strategies, and educational content</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#D51820]" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-[#D51820] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">{post.category === 'Crypto' ? '₿' : post.category === 'Commodities' ? '🥇' : '📊'}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#D51820] font-medium">{post.category}</span>
                  {post.trending && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">🔥 Trending</span>}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Stay Ahead of the Markets</h3>
          <p className="text-gray-400 mb-6">Get daily market analysis delivered to your inbox</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40" />
            <button className="bg-[#D51820] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
