import { useState } from 'react'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { Eye, EyeOff } from 'lucide-react'

function getOAuthUrl() {
  const authUrl = new URL("/api/oauth/authorize", window.location.origin);
  authUrl.searchParams.set("redirect_uri", `${window.location.origin}/api/oauth/callback`);
  return authUrl.toString();
}

export default function Login() {
  const [mode, setMode] = useState<'login' | 'admin'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('local_auth_token', data.token)
      window.location.href = data.user.role === 'admin' ? '/admin' : '/trading'
    },
    onError: (err) => setError(err.message),
  })

  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      <div className="bg-[#D51820] h-14 flex items-center justify-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-tight lowercase">axi</Link>
      </div>
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => { setMode('login'); setError('') }} className={`text-sm font-medium pb-1 border-b-2 transition-colors ${mode === 'login' ? 'border-[#D51820] text-[#D51820]' : 'border-transparent text-gray-500'}`}>Trader Login</button>
          <button onClick={() => { setMode('admin'); setError('') }} className={`text-sm font-medium pb-1 border-b-2 transition-colors ${mode === 'admin' ? 'border-[#D51820] text-[#D51820]' : 'border-transparent text-gray-500'}`}>Admin Login</button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">{mode === 'admin' ? 'Admin Login' : 'Log in'}</h1>
        {mode === 'login' ? (
          <div className="space-y-4">
            <a href={getOAuthUrl()} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3.5 text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              <span className="text-sm font-medium">Continue with OAuth</span>
            </a>
            <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-gray-300"/><span className="text-sm text-gray-500 font-medium">OR</span><div className="flex-1 h-px bg-gray-300"/></div>
            <form onSubmit={(e) => { e.preventDefault(); setError(''); loginMutation.mutate({ email, password }) }} className="space-y-4">
              <input type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D51820]" />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D51820] pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loginMutation.isPending} className="w-full bg-[#E5B80C] hover:bg-[#d4a90b] text-gray-900 py-3.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50">{loginMutation.isPending ? 'Logging in...' : 'Log in'}</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">Don't have an account? <Link to="/signup" className="text-[#D51820] underline font-medium">Sign up</Link></p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setError(''); loginMutation.mutate({ email, password }) }} className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">Admin access only. Use your admin email and password.</p>
            </div>
            <input type="email" placeholder="Admin email *" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D51820]" />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Admin password *" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#D51820] pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loginMutation.isPending} className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50">{loginMutation.isPending ? 'Logging in...' : 'Admin Login'}</button>
          </form>
        )}
      </div>
    </div>
  )
}