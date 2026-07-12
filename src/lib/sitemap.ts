import { writeFileSync } from 'fs';
import { siteConfig } from './seo';

const routes = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/markets', priority: 0.9, changefreq: 'daily' },
  { path: '/markets/forex', priority: 0.9, changefreq: 'daily' },
  { path: '/markets/crypto', priority: 0.9, changefreq: 'daily' },
  { path: '/markets/commodities', priority: 0.9, changefreq: 'daily' },
  { path: '/markets/indices', priority: 0.9, changefreq: 'daily' },
  { path: '/markets/shares', priority: 0.9, changefreq: 'daily' },
  { path: '/trading-tools', priority: 0.8, changefreq: 'weekly' },
  { path: '/platforms', priority: 0.8, changefreq: 'weekly' },
  { path: '/platforms/mt4', priority: 0.8, changefreq: 'weekly' },
  { path: '/platforms/mt5', priority: 0.8, changefreq: 'weekly' },
  { path: '/learn', priority: 0.8, changefreq: 'weekly' },
  { path: '/partnerships', priority: 0.7, changefreq: 'monthly' },
  { path: '/company', priority: 0.7, changefreq: 'monthly' },
  { path: '/help', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/login', priority: 0.6, changefreq: 'monthly' },
  { path: '/register', priority: 0.6, changefreq: 'monthly' },
  { path: '/open-account', priority: 0.9, changefreq: 'monthly' },
  { path: '/axi-select', priority: 0.8, changefreq: 'weekly' },
  { path: '/funds', priority: 0.8, changefreq: 'weekly' },
  { path: '/terms-of-service', priority: 0.5, changefreq: 'yearly' },
  { path: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/risk-disclosure', priority: 0.5, changefreq: 'yearly' },
  { path: '/cookie-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/gdpr-compliance', priority: 0.5, changefreq: 'yearly' },
  { path: '/aml-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/kyc-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/refund-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/disclaimer', priority: 0.5, changefreq: 'yearly' },
  { path: '/complaints-procedure', priority: 0.5, changefreq: 'yearly' },
  { path: '/conflicts-of-interest', priority: 0.5, changefreq: 'yearly' },
  { path: '/best-execution-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/leverage-policy', priority: 0.5, changefreq: 'yearly' },
  { path: '/negative-balance-protection', priority: 0.5, changefreq: 'yearly' },
  { path: '/investor-compensation', priority: 0.5, changefreq: 'yearly' },
  { path: '/regulatory-information', priority: 0.5, changefreq: 'yearly' },
  { path: '/licenses', priority: 0.5, changefreq: 'yearly' },
  { path: '/fees-schedule', priority: 0.5, changefreq: 'yearly' },
  { path: '/trading-hours', priority: 0.6, changefreq: 'monthly' },
  { path: '/holiday-calendar', priority: 0.6, changefreq: 'monthly' },
  { path: '/economic-calendar', priority: 0.7, changefreq: 'daily' },
  { path: '/market-news', priority: 0.8, changefreq: 'daily' },
  { path: '/market-analysis', priority: 0.8, changefreq: 'daily' },
  { path: '/trading-signals', priority: 0.7, changefreq: 'daily' },
  { path: '/webinars', priority: 0.7, changefreq: 'weekly' },
  { path: '/tutorials', priority: 0.7, changefreq: 'weekly' },
  { path: '/glossary', priority: 0.6, changefreq: 'monthly' },
  { path: '/faq', priority: 0.7, changefreq: 'weekly' },
  { path: '/support', priority: 0.8, changefreq: 'weekly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/live-chat', priority: 0.7, changefreq: 'monthly' },
  { path: '/careers', priority: 0.5, changefreq: 'monthly' },
  { path: '/press', priority: 0.5, changefreq: 'monthly' },
  { path: '/affiliate-program', priority: 0.6, changefreq: 'monthly' },
  { path: '/ib-program', priority: 0.6, changefreq: 'monthly' },
  { path: '/white-label', priority: 0.5, changefreq: 'monthly' },
  { path: '/api-documentation', priority: 0.6, changefreq: 'monthly' },
  { path: '/mobile-apps', priority: 0.7, changefreq: 'monthly' },
  { path: '/system-status', priority: 0.6, changefreq: 'hourly' },
  { path: '/security', priority: 0.6, changefreq: 'monthly' },
  { path: '/sustainability', priority: 0.5, changefreq: 'monthly' },
  { path: '/accessibility', priority: 0.5, changefreq: 'yearly' },
  { path: '/sitemap', priority: 0.4, changefreq: 'weekly' },
];

export function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${siteConfig.url}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

# Disallow admin and auth pages
Disallow: /admin
Disallow: /admin-v2
Disallow: /api/
Disallow: /dashboard
Disallow: /portal
Disallow: /settings
Disallow: /trading

# Crawl delay
Crawl-delay: 1

# Google-specific
User-agent: Googlebot
Allow: /

# Bing-specific
User-agent: Bingbot
Allow: /
`;
}

// Generate and save
if (typeof window === 'undefined') {
  try {
    writeFileSync('public/sitemap.xml', generateSitemap());
    writeFileSync('public/robots.txt', generateRobotsTxt());
    console.log('✅ Sitemap and robots.txt generated');
  } catch (e) {
    console.error('Failed to generate sitemap:', e);
  }
}
