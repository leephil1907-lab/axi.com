import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/': [{ label: 'Home', path: '/' }],
  '/markets': [{ label: 'Home', path: '/' }, { label: 'Markets', path: '/markets' }],
  '/markets/forex': [{ label: 'Home', path: '/' }, { label: 'Markets', path: '/markets' }, { label: 'Forex', path: '/markets/forex' }],
  '/markets/crypto': [{ label: 'Home', path: '/' }, { label: 'Markets', path: '/markets' }, { label: 'Crypto', path: '/markets/crypto' }],
  '/markets/commodities': [{ label: 'Home', path: '/' }, { label: 'Markets', path: '/markets' }, { label: 'Commodities', path: '/markets/commodities' }],
  '/markets/indices': [{ label: 'Home', path: '/' }, { label: 'Markets', path: '/markets' }, { label: 'Indices', path: '/markets/indices' }],
  '/markets/shares': [{ label: 'Home', path: '/' }, { label: 'Markets', path: '/markets' }, { label: 'Shares', path: '/markets/shares' }],
  '/platforms': [{ label: 'Home', path: '/' }, { label: 'Platforms', path: '/platforms' }],
  '/platforms/mt4': [{ label: 'Home', path: '/' }, { label: 'Platforms', path: '/platforms' }, { label: 'MetaTrader 4', path: '/platforms/mt4' }],
  '/platforms/mt5': [{ label: 'Home', path: '/' }, { label: 'Platforms', path: '/platforms' }, { label: 'MetaTrader 5', path: '/platforms/mt5' }],
  '/trading-tools': [{ label: 'Home', path: '/' }, { label: 'Trading Tools', path: '/trading-tools' }],
  '/learn': [{ label: 'Home', path: '/' }, { label: 'Learn', path: '/learn' }],
  '/blog': [{ label: 'Home', path: '/' }, { label: 'Blog', path: '/blog' }],
  '/help': [{ label: 'Home', path: '/' }, { label: 'Help Center', path: '/help' }],
  '/faq': [{ label: 'Home', path: '/' }, { label: 'Help Center', path: '/help' }, { label: 'FAQ', path: '/faq' }],
  '/support': [{ label: 'Home', path: '/' }, { label: 'Support', path: '/support' }],
  '/contact': [{ label: 'Home', path: '/' }, { label: 'Contact Us', path: '/contact' }],
  '/company': [{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }],
  '/partnerships': [{ label: 'Home', path: '/' }, { label: 'Partnerships', path: '/partnerships' }],
  '/careers': [{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Careers', path: '/careers' }],
  '/press': [{ label: 'Home', path: '/' }, { label: 'Company', path: '/company' }, { label: 'Press', path: '/press' }],
  '/terms-of-service': [{ label: 'Home', path: '/' }, { label: 'Legal', path: '#' }, { label: 'Terms of Service', path: '/terms-of-service' }],
  '/privacy-policy': [{ label: 'Home', path: '/' }, { label: 'Legal', path: '#' }, { label: 'Privacy Policy', path: '/privacy-policy' }],
  '/risk-disclosure': [{ label: 'Home', path: '/' }, { label: 'Legal', path: '#' }, { label: 'Risk Disclosure', path: '/risk-disclosure' }],
  '/cookie-policy': [{ label: 'Home', path: '/' }, { label: 'Legal', path: '#' }, { label: 'Cookie Policy', path: '/cookie-policy' }],
  '/axi-select': [{ label: 'Home', path: '/' }, { label: 'AXI Select', path: '/axi-select' }],
  '/funds': [{ label: 'Home', path: '/' }, { label: 'Funds', path: '/funds' }],
  '/login': [{ label: 'Home', path: '/' }, { label: 'Login', path: '/login' }],
  '/register': [{ label: 'Home', path: '/' }, { label: 'Register', path: '/register' }],
};

export default function Breadcrumb() {
  const location = useLocation();
  const items = breadcrumbMap[location.pathname] || [{ label: 'Home', path: '/' }];

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="text-gray-500 hover:text-[#D51820] transition-colors">
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
