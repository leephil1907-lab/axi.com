import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/sections/Navbar'

const depositMethods = [
  { name: 'Crypto', desc: 'Instantly, 0% Fee', icon: '\u20BF' },
  { name: 'Binance Pay', desc: 'Instantly, 0% Fee', icon: '\uD83D\uDC8E' },
  { name: 'Google Pay', desc: 'Instantly, 0% Fee', icon: 'G' },
  { name: 'Skrill', desc: 'Instantly, 0% Fee', icon: 'S' },
  { name: 'Credit or Debit Card', desc: 'Instantly, 0% Fee', icon: '\uD83D\uDCB3' },
]

export default function Funds() {
  const { isAuthenticated } = useAuth()
  const [tab, setTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit')

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#F0EDE6]"><Navbar /><div className="pt-24 text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access funds</h1><Link to="/login" className="bg-[#E5B80C] text-gray-900 px-6 py-2.5 rounded text-sm font-bold">Log In</Link></div></div>
  )

  return (
    <div className="min-h-screen bg-[#F0EDE6]">
      <Navbar />
      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Funds</h1>
        <div className="flex border-b border-gray-200 mb-6">
          {[{key:'deposit' as const,label:'Deposit'},{key:'withdraw' as const,label:'Withdraw'},{key:'history' as const,label:'Funding History'}].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${tab===t.key?'border-[#D51820] text-[#D51820]':'border-transparent text-gray-500'}`}>{t.label}</button>
          ))}
        </div>
        {tab==='deposit' && <div>
          <div className="bg-[#D51820] text-white text-xs px-4 py-2 rounded mb-4 inline-block">Select method</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">What payment method would you like to use?</h2>
          <p className="text-sm text-gray-500 mb-4">Add new funding methods</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {depositMethods.map(m => (
              <button key={m.name} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-[#D51820] hover:shadow-md transition-all text-left">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-xl border border-gray-100">{m.icon}</div>
                <div className="flex-1"><div className="font-medium text-gray-900 text-sm">{m.name}</div><div className="text-xs text-gray-500">{m.desc}</div></div>
                <span className="text-gray-400">\u203A</span>
              </button>
            ))}
          </div>
        </div>}
        {tab==='withdraw' && <div>
          <div className="bg-gray-800 text-white text-xs px-4 py-2 rounded mb-4 inline-block">Select Axi Account</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Which account would you like to withdraw from?</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[{type:'Standard',login:'60332183',label:'AXI SELECT',balance:'0.00'},{type:'Standard',login:'60332182',label:null,balance:'0.00'}].map((acc,i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded font-bold">MT5</span>
                  {acc.label && <span className="bg-[#D51820] text-white text-[10px] px-2 py-0.5 rounded font-bold">{acc.label}</span>}
                  <span className="text-sm font-medium text-gray-700">{acc.type} {acc.login}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div><div className="text-xs text-gray-500">Withdrawable (USD)</div><div className="text-lg font-bold text-gray-900">{acc.balance}</div></div>
                  <button className="border border-gray-300 text-gray-600 px-4 py-1.5 rounded text-xs hover:bg-gray-50">Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>}
        {tab==='history' && <div className="text-center py-12 text-gray-400"><p>No funding history yet</p></div>}
      </div>
    </div>
  )
}