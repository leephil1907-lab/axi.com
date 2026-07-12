export const DEFAULT_CURRENCY = 'EUR';

export const CURRENCIES = [
  'EUR','USD','GBP','JPY','CHF','AUD','CAD','NZD','SEK','NOK','DKK',
  'PLN','CZK','HUF','RON','BGN','HRK','TRY','ZAR','NGN','KES','GHS',
  'EGP','MAD','AED','SAR','QAR','KWD','BHD','OMR','JOD','INR','PKR',
  'LKR','BDT','THB','VND','IDR','MYR','SGD','PHP','CNY','HKD','TWD',
  'KRW','BRL','MXN','ARS','CLP','COP','PEN'
];

export const LANGUAGES = [
  {code:'en', label:'English'},{code:'es', label:'Español'},{code:'fr', label:'Français'},
  {code:'de', label:'Deutsch'},{code:'it', label:'Italiano'},{code:'pt', label:'Português'},
  {code:'ru', label:'Русский'},{code:'ar', label:'العربية'},{code:'zh', label:'中文'},
  {code:'ja', label:'日本語'},{code:'ko', label:'한국어'},{code:'hi', label:'हिन्दी'},
  {code:'tr', label:'Türkçe'},{code:'pl', label:'Polski'},{code:'nl', label:'Nederlands'},
  {code:'sv', label:'Svenska'},{code:'da', label:'Dansk'},{code:'fi', label:'Suomi'},
  {code:'el', label:'Ελληνικά'},{code:'cs', label:'Čeština'},{code:'hu', label:'Magyar'},
  {code:'ro', label:'Română'},{code:'uk', label:'Українська'},{code:'vi', label:'Tiếng Việt'},
  {code:'th', label:'ไทย'},{code:'id', label:'Bahasa Indonesia'},{code:'ms', label:'Bahasa Melayu'}
];

export const COUNTRIES = [
  {code:'NG', label:'Nigeria'},{code:'US', label:'United States'},{code:'GB', label:'United Kingdom'},
  {code:'DE', label:'Germany'},{code:'FR', label:'France'},{code:'ES', label:'Spain'},
  {code:'IT', label:'Italy'},{code:'NL', label:'Netherlands'},{code:'SE', label:'Sweden'},
  {code:'NO', label:'Norway'},{code:'DK', label:'Denmark'},{code:'FI', label:'Finland'},
  {code:'PL', label:'Poland'},{code:'CZ', label:'Czechia'},{code:'GR', label:'Greece'},
  {code:'TR', label:'Türkiye'},{code:'ZA', label:'South Africa'},{code:'KE', label:'Kenya'},
  {code:'GH', label:'Ghana'},{code:'EG', label:'Egypt'},{code:'MA', label:'Morocco'},
  {code:'AE', label:'United Arab Emirates'},{code:'SA', label:'Saudi Arabia'},
  {code:'IN', label:'India'},{code:'PK', label:'Pakistan'},{code:'BD', label:'Bangladesh'},
  {code:'CN', label:'China'},{code:'JP', label:'Japan'},{code:'KR', label:'South Korea'},
  {code:'AU', label:'Australia'},{code:'NZ', label:'New Zealand'},{code:'BR', label:'Brazil'},
  {code:'MX', label:'Mexico'},{code:'AR', label:'Argentina'},{code:'CA', label:'Canada'}
];

// Account types matching AXI design
export const ACCOUNT_TYPES = [
  { id: 'standard', name: 'Standard', badge: 'Most Popular', description: 'Our best account for everyday traders', spread: 'From 0.9', commission: 'No Commission', minLot: '0.01 Lot', minDeposit: 'No Minimum' },
  { id: 'pro', name: 'Pro', badge: 'Low Spreads', description: 'Preferential spreads for more experienced traders', spread: 'From 0.0', commission: '$4.50 Round-Trip', minLot: '0.01 Lot', minDeposit: 'No Minimum' },
  { id: 'elite', name: 'Elite', badge: 'Raw Spreads', description: 'Institutional-grade execution for professionals', spread: 'From 0.0', commission: '$3.50 Round-Trip', minLot: '0.01 Lot', minDeposit: '$25,000' },
];

// Payment methods matching AXI design
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'visa', currencies: ['AED','CAD','CHF','EUR','GBP','HKD','PLN','SGD','USD','ZAR'], minWithdrawal: 'USD 5', maxWithdrawal: 'USD 50,000', time: 'Instant*', fee: '0%' },
  { id: 'bank', name: 'International Bank Transfer', icon: 'bank', currencies: ['CAD','CHF','EUR','GBP','HKD','SGD','USD'], minWithdrawal: 'USD 50', maxWithdrawal: 'USD 10,000,000', time: '1-3 days', fee: '0%' },
  { id: 'skrill', name: 'Skrill', icon: 'skrill', currencies: ['AED','CAD','EUR','GBP','PLN','USD'], minWithdrawal: 'EUR 5', maxWithdrawal: 'EUR 100,000', time: 'Instant', fee: '0%' },
  { id: 'neteller', name: 'Neteller', icon: 'neteller', currencies: ['CAD','EUR','GBP','PLN','USD'], minWithdrawal: 'USD 5', maxWithdrawal: 'USD 1,000,000', time: 'Instant', fee: '0%' },
  { id: 'crypto', name: 'Crypto', icon: 'crypto', currencies: ['BTC','ETH','LTC','XRP','XLM','USDT'], minWithdrawal: 'USD 30', maxWithdrawal: 'USD 250,000', time: 'Up to 15mins', fee: '0%' },
  { id: 'googlepay', name: 'Google Pay', icon: 'gpay', currencies: ['EUR','GBP','USD'], minWithdrawal: 'USD 5', maxWithdrawal: 'USD 10,000', time: 'Instant', fee: '0%' },
  { id: 'binance', name: 'Binance Pay', icon: 'binance', currencies: ['USDT','BUSD'], minWithdrawal: 'USD 10', maxWithdrawal: 'USD 100,000', time: 'Instant', fee: '0%' },
];

// AXI Select tiers
export const AXI_SELECT_TIERS = [
  { name: 'Seed', allocation: '$500', profitShare: '70%', requirement: 'Edge Score 50+' },
  { name: 'Incubation', allocation: '$20,000', profitShare: '75%', requirement: 'Edge Score 60+' },
  { name: 'Acceleration', allocation: '$100,000', profitShare: '78%', requirement: 'Edge Score 70+' },
  { name: 'Pro', allocation: '$250,000', profitShare: '80%', requirement: 'Edge Score 80+' },
  { name: 'Pro 500', allocation: '$500,000', profitShare: '80%', requirement: 'Edge Score 85+' },
  { name: 'Pro M', allocation: '$1,000,000', profitShare: '80%', requirement: 'Edge Score 90+' },
];
