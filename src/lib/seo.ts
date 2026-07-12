// SEO Utilities for AXI Trading Platform

export const siteConfig = {
  name: 'AXI Trading',
  url: 'https://axi-trading.com',
  ogImage: 'https://axi-trading.com/og-image.jpg',
  description: 'Trade Forex, Crypto, Commodities & Indices with AXI. Award-winning platform with 1000+ instruments, tight spreads, and 24/7 support.',
  keywords: 'forex trading, crypto trading, CFD trading, MT4, MT5, online broker, trading platform, commodities, indices, stocks',
  twitter: '@AXITrading',
  facebook: 'AXITrading',
  locale: 'en_US',
  type: 'website',
};

export const defaultMetadata = {
  title: {
    default: 'AXI Trading | Trade Forex, Crypto & CFDs Online',
    template: '%s | AXI Trading',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'AXI Trading' }],
  creator: 'AXI Trading',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'AXI Trading | Trade Forex, Crypto & CFDs Online',
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'AXI Trading Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: 'AXI Trading | Trade Forex, Crypto & CFDs Online',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_ID',
    yandex: 'YOUR_YANDEX_ID',
    bing: 'YOUR_BING_WEBMASTER_ID',
  },
};

// Page-specific metadata generator
export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}) {
  return {
    title: `${title} | AXI Trading`,
    description,
    keywords: siteConfig.keywords,
    alternates: { canonical: `${siteConfig.url}${path}` },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | AXI Trading`,
      description,
      url: `${siteConfig.url}${path}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : defaultMetadata.openGraph.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | AXI Trading`,
      description,
      images: ogImage ? [ogImage] : defaultMetadata.twitter.images,
    },
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
  };
}

// Schema.org structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AXI Trading',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      'https://twitter.com/AXITrading',
      'https://facebook.com/AXITrading',
      'https://linkedin.com/company/axi-trading',
      'https://instagram.com/axi.trading',
      'https://youtube.com/AXITrading',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-888-8888',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Spanish', 'French', 'German', 'Arabic', 'Chinese'],
    },
  };
}

export function generateFinancialProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'AXI Trading Account',
    description: 'Trade Forex, Crypto, Commodities and Indices with tight spreads',
    provider: {
      '@type': 'Organization',
      name: 'AXI Trading',
    },
    category: 'Trading Account',
    termsOfService: `${siteConfig.url}/terms-of-service`,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'AXI Trading',
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    url: `${siteConfig.url}${url}`,
  };
}
