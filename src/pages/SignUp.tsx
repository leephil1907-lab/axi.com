import { useState } from 'react'
import { Link } from 'react-router'
import { useLocale } from '@/hooks/useLocale'
import { Eye, EyeOff } from 'lucide-react'

const countries = ['Nigeria','United Kingdom','Australia','Germany','France','Spain','Italy','United States','Canada','United Arab Emirates','Saudi Arabia','South Africa','India','China','Japan','South Korea','Singapore','Malaysia','Thailand','Vietnam','Indonesia','Brazil','Mexico','Turkey','Russia','Netherlands','Sweden','Poland','Portugal','New Zealand','Switzerland','Hong Kong']

export default function SignUp() {
  const { t } = useLocale()
  const [step, setStep] = useState<'country' | 'signup'>('country')
  const [country, setCountry] = useState('Nigeria')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [consentPrivacy, setConsentPrivacy] = useState(false)
  const [consentMarketing, setConsentMarketing] = useState(false)

  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      <div className="bg-[#D51820] h-14 flex items-center justify-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-tight lowercase">axi</Link>
      </div>
      <div className="max-w-lg mx-auto px-4 py-10">
        {step === 'country' ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">{t('account.title')}</h1>
            <div className="mb-6">
              <label className="block text-base text-gray-700 mb-2">{t('account.country')}</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D51820] appearance-none">
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={() => setStep('signup')} className="w-full bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 py-4 rounded-lg text-base font-bold transition-colors">{t('signup.continue')}</button>
            <p className="text-sm text-gray-600 mt-6">{t('account.agree')} <a href="#" className="text-[#D51820] underline">{t('signup.privacy')}</a> {t('account.and')}</p>
            <p className="text-center text-sm text-gray-600 mt-8">{t('account.client')} <Link to="/login" className="text-[#D51820] underline font-medium">{t('nav.login')}</Link></p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">{t('signup.title')}</h1>
            <div className="space-y-4">
              <input type="email" placeholder={`${t('signup.email')} *`} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D51820]" />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder={`${t('signup.password')} *`} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D51820] pr-12" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consentPrivacy} onChange={(e) => setConsentPrivacy(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D51820] focus:ring-[#D51820]" />
                  <span className="text-sm text-gray-600">{t('signup.consent')} <a href="#" className="text-[#D51820] underline">{t('signup.privacy')}</a> .</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={consentMarketing} onChange={(e) => setConsentMarketing(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D51820] focus:ring-[#D51820]" />
                  <span className="text-sm text-gray-600">{t('signup.marketing')}</span>
                </label>
              </div>
              <button className="w-full bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 py-4 rounded-lg text-base font-bold transition-colors mt-4">{t('signup.continue')}</button>
              <p className="text-center text-sm text-gray-600 mt-4">{t('signup.hasAccount')} <Link to="/login" className="text-[#D51820] underline font-medium">{t('nav.login')}</Link></p>
              <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-gray-300"/><span className="text-sm text-gray-500 font-medium">{t('signup.or')}</span><div className="flex-1 h-px bg-gray-300"/></div>
              {['google','apple','facebook'].map(s => (
                <button key={s} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3.5 text-gray-700 hover:bg-gray-50 transition-colors mb-3">
                  <span className="text-sm font-medium">{t(`signup.${s}`)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}