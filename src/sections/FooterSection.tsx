import { BarChart3 } from 'lucide-react'
import { Link } from 'react-router'

const footerLinks = {
  Trading: ['Forex','Crypto','Metals','Indices','Commodities','Shares'],
  Platforms: ['MT4','MT5','WebTrader','Mobile Apps','Trading Tools'],
  Company: ['About Us','Regulation','Awards','Careers','Press','Partners'],
  Resources: ['Education','Market News','Economic Calendar','Trading Calculator','Glossary'],
  Support: ['Help Center','Contact Us','Live Chat','FAQ','Account Funding'],
  Legal: ['Privacy Policy','Cookie Policy','Terms & Conditions','Risk Disclosure','Client Agreement'],
}

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">{links.map(link => <li key={link}><a href="#" className="text-sm hover:text-white transition-colors">{link}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D51820] rounded flex items-center justify-center"><BarChart3 className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-bold text-white">Axi</span>
            </div>
            <p className="text-xs text-center max-w-2xl text-gray-500">Axi is a trading name of AxiTrader Limited. AxiTrader Limited is regulated by the Financial Conduct Authority (FCA) - 509746. Trading CFDs involves significant risk of loss. Not suitable for all investors.</p>
          </div>
          <div className="mt-8 text-center text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} Axi. All rights reserved. AxiTrader is a registered trademark of AxiCorp Financial Services Pty Ltd.</p>
            <p className="mt-2">Risk Warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 72% of retail investor accounts lose money when trading CFDs with this provider.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}