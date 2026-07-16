import { Link } from 'react-router'
import { useLocale, currencies } from '@/hooks/useLocale'
import { useAuth } from '@/hooks/useAuth'

export default function HeroSection() {
  const { currency } = useLocale()
  const { isAuthenticated } = useAuth()
  const cur = currencies.find(c => c.code === currency) || currencies[0]
  const stats = [
    { value: `${cur.symbol}5`, sub: 'Minimum', label: 'deposit' },
    { value: '220+', sub: 'Products', label: 'to trade' },
    { value: '0.7', sub: 'Average', label: 'spreads' },
    { value: '30:1', sub: 'Max', label: 'Leverage' },
  ]

  return (
    <>
      <div className="bg-white py-4 pt-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="w-6 h-6 bg-[#E5B80C] rounded-full flex items-center justify-center text-white text-xs font-bold">/</span>
          <span className="text-gray-700 text-sm font-medium">An established global broker since 2007</span>
        </div>
        <div className="text-center mt-4">
          <Link to={isAuthenticated ? '/trading' : '/signup'} className="inline-block bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 px-8 py-3 rounded text-sm font-bold transition-colors">Trade with a top broker</Link>
        </div>
      </div>
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1611974765270-ca1258634369?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Trade <span className="text-[#E5B80C]">220+ products</span> with unbeatable trading conditions
            </h1>
            <div className="mt-6">
              <Link to={isAuthenticated ? '/trading' : '/signup'} className="inline-block bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 px-8 py-3 rounded text-sm font-bold transition-colors">OPEN ACCOUNT</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F0EB] py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1"><span className="text-gray-400 mr-1">/</span>{stat.sub} {stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ['Transparent pricing, great value','Low spreads and deep liquidity','High-performance, innovative trading technology'],
              ['Free education to sharpen your skills','Self-service portal and multilingual support','Lightning-fast execution, rock-solid platform'],
            ].map((col, ci) => (
              <div key={ci} className="space-y-3">
                {col.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#D51820] text-sm font-bold mt-0.5">/</span>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 px-8 py-3 rounded text-sm font-bold transition-colors">TRADE WITH AXi</button>
          </div>
        </div>
      </section>
    </>
  )
}