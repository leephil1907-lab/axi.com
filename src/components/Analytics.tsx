import { useEffect } from 'react';

// Google Analytics 4
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

// Microsoft Clarity
const CLARITY_PROJECT_ID = 'XXXXXXXXXX'; // Replace with your Clarity ID

export function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    const gaConfig = document.createElement('script');
    gaConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure',
        custom_map: {
          'custom_parameter_1': 'user_type',
          'custom_parameter_2': 'account_tier',
        }
      });
    `;
    document.head.appendChild(gaConfig);

    // Microsoft Clarity
    const clarityScript = document.createElement('script');
    clarityScript.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
    `;
    document.head.appendChild(clarityScript);

    // Bing Webmaster Tools
    const bingMeta = document.createElement('meta');
    bingMeta.name = 'msvalidate.01';
    bingMeta.content = 'YOUR_BING_VERIFICATION_CODE';
    document.head.appendChild(bingMeta);

    return () => {
      document.head.removeChild(gaScript);
      document.head.removeChild(gaConfig);
      document.head.removeChild(clarityScript);
      document.head.removeChild(bingMeta);
    };
  }, []);

  return null;
}

// Track custom events
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// Track page views
export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

// Track conversions
export function trackConversion(value: number, currency: string = 'EUR') {
  trackEvent('conversion', { value, currency });
}
