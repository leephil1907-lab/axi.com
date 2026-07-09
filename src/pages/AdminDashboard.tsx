import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import Navbar from '@/sections/Navbar'
import { Users, BarChart3, TrendingUp, DollarSign, Shield, ChevronLeft, Search, ChevronLeft as CL, ChevronRight as CR } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [userPage, setUserPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!isAdmin) { navigate('/trading'); return null }

  const { data: analytics } = trpc.admin.analytics.useQuery(undefined, { enabled: isAdmin })
  const { data: usersData } = trpc.admin.users.useQuery({ page: userPage, limit: 10, search: searchQuery || undefined }, { enabled: isAdmin })
  const { data: positionsData } = trpc.admin.allPositions.useQuery({ status: 'open', page: 1, limit: 20 }, { enabled: isAdmin })
  const { data: tradesData } = trpc.admin.allTrades.useQuery({ page: 1, limit: 20 }, { enabled: isAdmin })

  const utils = trpc.useUtils()
  const updateUserRole = trpc.admin.updateUserRole.useMutation({ onSuccess: () => utils.admin.users.invalidate() })

  const statCards = [
    { label: 'Total Users', value: analytics?.counts.users || 0, icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Trading Accounts', value: analytics?.counts.accounts || 0, icon: BarChart3, color: 'bg-green-500', change: '+8%' },
    { label: 'Open Positions', value: analytics?.counts.openPositions || 0, icon: TrendingUp, color: 'bg-[#D51820]', change: '+24%' },
    { label: 'Net P&L', value: `$${Number(analytics?.pnl.net || 0).toFixed(2)}`, icon: DollarSign, color: 'bg-purple-500', change: '+5%' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Link to="/trading" className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#D51820]"><ChevronLeft className="w-4 h-4" /> Trading</Link>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#D51820]" /><span className="text-sm font-semibold text-gray-800">Admin Dashboard</span></div>
          </div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span className="text-xs text-gray-500">System Online</span></div>
        </div>
      </div>
      <div className="pt-28 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3"><div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}><card.icon className="w-5 h-5 text-white" /></div><span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{card.change}</span></div>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div><div className="text-xs text-gray-500">{card.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200">
              {[{key:'overview',label:'Overview'},{key:'users',label:'Users'},{key:'positions',label:'Positions'},{key:'trades',label:'Trade History'}].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab===tab.key?'border-[#D51820] text-[#D51820]':'border-transparent text-gray-600'}`}>{tab.label}</button>
              ))}
            </div>
            <div className="p-6">
              {activeTab==='overview' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-5"><h3 className="font-semibold text-gray-800 mb-4">Trading Performance</h3><div className="space-y-3"><div className="flex justify-between"><span className="text-sm text-gray-600">Gross P&L</span><span className={`font-mono font-semibold ${Number(analytics?.pnl.gross||0)>=0?'text-green-600':'text-red-600'}`}>${Number(analytics?.pnl.gross||0).toFixed(2)}</span></div><div className="flex justify-between"><span className="text-sm text-gray-600">Commission</span><span className="font-mono font-semibold">${Number(analytics?.pnl.commission||0).toFixed(2)}</span></div><div className="border-t border-gray-200 pt-3 flex justify-between"><span className="text-sm font-semibold">Net P&L</span><span className={`font-mono font-bold ${Number(analytics?.pnl.net||0)>=0?'text-green-600':'text-red-600'}`}>${Number(analytics?.pnl.net||0).toFixed(2)}</span></div></div></div>
                <div className="bg-gray-50 rounded-xl p-5"><h3 className="font-semibold text-gray-800 mb-4">Recent Registrations</h3><div className="space-y-3">{analytics?.recentUsers?.slice(0,5).map((u:any) => <div key={u.id} className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">{(u.name||'U').charAt(0).toUpperCase()}</div><div><div className="text-sm font-medium">{u.name||'Anonymous'}</div><div className="text-xs text-gray-500">{u.email||'No email'}</div></div></div><span className={`text-xs px-2 py-1 rounded-full ${u.role==='admin'?'bg-purple-100 text-purple-700':'bg-gray-100 text-gray-600'}`}>{u.role}</span></div>)||<div className="text-sm text-gray-400">No recent users</div>}</div></div>
              </div>}
              {activeTab==='users' && <div>
                <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800">All Users ({usersData?.total||0})</h3><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/><input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D51820]"/></div></div>
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-gray-500 border-b border-gray-200"><th className="text-left py-3 px-3">ID</th><th className="text-left py-3 px-3">Name</th><th className="text-left py-3 px-3">Email</th><th className="text-left py-3 px-3">Role</th><th className="text-left py-3 px-3">Actions</th></tr></thead><tbody>{usersData?.users?.map((u:any) => <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50"><td className="py-3 px-3 font-mono text-xs">{u.id}</td><td className="py-3 px-3 font-medium">{u.name||'Anonymous'}</td><td className="py-3 px-3 text-gray-600">{u.email||'--'}</td><td className="py-3 px-3"><span className={`text-xs px-2 py-1 rounded-full ${u.role==='admin'?'bg-purple-100 text-purple-700':'bg-gray-100 text-gray-600'}`}>{u.role}</span></td><td className="py-3 px-3"><button onClick={() => updateUserRole.mutate({userId:u.id,role:u.role==='admin'?'user':'admin'})} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200">{u.role==='admin'?'Demote':'Promote'}</button></td></tr>)}</tbody></table></div>
                <div className="flex items-center justify-between mt-4"><span className="text-xs text-gray-500">Page {userPage} of {Math.ceil((usersData?.total||0)/10)}</span><div className="flex gap-2"><button onClick={() => setUserPage(Math.max(1,userPage-1))} disabled={userPage<=1} className="p-2 border border-gray-200 rounded-lg disabled:opacity-50"><CL className="w-4 h-4"/></button><button onClick={() => setUserPage(userPage+1)} disabled={userPage>=Math.ceil((usersData?.total||0)/10)} className="p-2 border border-gray-200 rounded-lg disabled:opacity-50"><CR className="w-4 h-4"/></button></div></div>
              </div>}
              {activeTab==='positions' && <div><h3 className="font-semibold text-gray-800 mb-4">All Open Positions ({positionsData?.total||0})</h3><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-gray-500 border-b border-gray-200"><th className="text-left py-3 px-3">ID</th><th className="text-left py-3 px-3">User</th><th className="text-left py-3 px-3">Direction</th><th className="text-right py-3 px-3">Volume</th><th className="text-right py-3 px-3">Open Price</th><th className="text-right py-3 px-3">P&L</th></tr></thead><tbody>{positionsData?.positions?.map((pos:any) => <tr key={pos.id} className="border-b border-gray-50 hover:bg-gray-50"><td className="py-3 px-3 font-mono text-xs">{pos.id}</td><td className="py-3 px-3 text-gray-600">{pos.userId}</td><td className="py-3 px-3"><span className={`text-xs px-2 py-1 rounded-full ${pos.direction==='buy'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{pos.direction.toUpperCase()}</span></td><td className="py-3 px-3 text-right">{pos.volume}</td><td className="py-3 px-3 text-right font-mono">{Number(pos.openPrice).toFixed(5)}</td><td className={`py-3 px-3 text-right font-mono ${Number(pos.realizedPnl)>=0?'text-green-600':'text-red-600'}`}>{Number(pos.realizedPnl).toFixed(2)}</td></tr>)||<tr><td colSpan={6} className="text-center py-8 text-gray-400">No open positions</td></tr>}</tbody></table></div></div>}
              {activeTab==='trades' && <div><h3 className="font-semibold text-gray-800 mb-4">Trade History ({tradesData?.total||0})</h3><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-gray-500 border-b border-gray-200"><th className="text-left py-3 px-3">ID</th><th className="text-left py-3 px-3">User</th><th className="text-left py-3 px-3">Direction</th><th className="text-right py-3 px-3">Net P&L</th><th className="text-left py-3 px-3">Date</th></tr></thead><tbody>{tradesData?.trades?.map((trade:any) => <tr key={trade.id} className="border-b border-gray-50 hover:bg-gray-50"><td className="py-3 px-3 font-mono text-xs">{trade.id}</td><td className="py-3 px-3 text-gray-600">{trade.userId}</td><td className="py-3 px-3"><span className={`text-xs px-2 py-1 rounded-full ${trade.direction==='buy'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{trade.direction.toUpperCase()}</span></td><td className={`py-3 px-3 text-right font-mono ${Number(trade.netPnl)>=0?'text-green-600':'text-red-600'}`}>{Number(trade.netPnl).toFixed(2)}</td><td className="py-3 px-3 text-xs text-gray-500">{new Date(trade.closedAt).toLocaleDateString()}</td></tr>)||<tr><td colSpan={5} className="text-center py-8 text-gray-400">No trade history</td></tr>}</tbody></table></div></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}