import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { useLocale, languages } from '@/hooks/useLocale'
import { Globe, LogOut, Shield } from 'lucide-react'

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { lang, setLang, t } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#D51820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="text-white text-2xl font-bold tracking-tight lowercase">axi</Link>
            <div className="hidden md:flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/signup" className="bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 px-5 py-2 rounded text-sm font-bold tracking-wide transition-colors">{t('nav.openAccount')}</Link>
                  <Link to="/login" className="border border-white/60 text-white hover:bg-white/10 px-5 py-2 rounded text-sm font-semibold transition-colors">Login</Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/trading" className="text-sm text-white/90 hover:text-white">Platform</Link>
                  <Link to="/funds" className="text-sm text-white/90 hover:text-white">Funds</Link>
                  {isAdmin && <Link to="/admin" className="flex items-center gap-1 text-sm text-white/90 hover:text-white"><Shield className="w-3.5 h-3.5" /> Admin</Link>}
                  <span className="text-sm text-white">{user?.name || 'Trader'}</span>
                  <button onClick={logout} className="text-white/70 hover:text-white"><LogOut className="w-4 h-4" /></button>
                </div>
              )}
              <div className="relative ml-2">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-white text-sm">
                  <Globe className="w-4 h-4" /><span>{currentLang.label}</span>
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2 max-h-72 overflow-y-auto z-50">
                    {languages.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${lang === l.code ? 'text-[#D51820] font-medium' : 'text-gray-700'}`}>
                        <span>{l.flag}</span><span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex md:hidden items-center gap-2">
              {!isAuthenticated && (
                <>
                  <Link to="/signup" className="bg-[#E5B80C] text-gray-900 px-3 py-1.5 rounded text-xs font-bold">{t('nav.openAccount')}</Link>
                  <Link to="/login" className="border border-white/60 text-white px-3 py-1.5 rounded text-xs font-semibold">Login</Link>
                </>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white ml-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 h-9">
              {['Trading','Platforms','Tools','Education','Partners','Support'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white/70 text-xs hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="px-4 py-4 space-y-1">
            {['Trading','Platforms','Tools','Education','Partners','Support'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block text-base font-medium text-gray-800 py-2.5 border-b border-gray-100">{item}</a>
            ))}
            {isAuthenticated && (
              <>
                <Link to="/trading" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-[#D51820] py-2.5 border-b border-gray-100">Trading Platform</Link>
                <Link to="/funds" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-[#D51820] py-2.5 border-b border-gray-100">Funds</Link>
                {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-purple-600 py-2.5 border-b border-gray-100">Admin Dashboard</Link>}
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block text-base text-gray-500 py-2.5">Log out</button>
              </>
            )}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.slice(0, 8).map(l => (
                  <button key={l.code} onClick={() => setLang(l.code)}
                    className={`text-left px-3 py-2 rounded text-sm ${lang === l.code ? 'bg-[#D51820] text-white' : 'bg-gray-50 text-gray-700'}`}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}