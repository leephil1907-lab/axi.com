import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { 
  ChevronLeft, Users, DollarSign, TrendingUp, BarChart3, 
  Shield, Activity, Search, Filter, Download, RefreshCw,
  AlertTriangle, CheckCircle, XCircle, Clock, ArrowUpDown
} from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const { data: stats } = trpc.admin.stats.useQuery()
  const { data: users } = trpc.admin.users.useQuery({ page: currentPage, search: searchQuery || undefined })
  const { data: allPositions } = trpc.admin.allPositions.useQuery()
  const { data: allTrades } = trpc.admin.allTrades.useQuery()
  const { data: deposits } = trpc.admin.deposits.useQuery()
  const { data: withdrawals } = trpc.admin.withdrawals.useQuery()

  const updateRole = trpc.admin.updateRole.useMutation({ onSuccess: () => { /* refresh */ } })
  const updateUserStatus = trpc.admin.updateUserStatus.useMutation()

  const totalVolume = allTrades?.reduce((sum, t) => sum + parseFloat(t.volume.toString()), 0) || 0
  const totalPnl = allTrades?.reduce((sum, t) => sum + parseFloat(t.netPnl.toString()), 0) || 0

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#D51820]" />
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Admin:</span>
              <span className="text-white font-medium">{user?.name || user?.email || 'Admin'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { key: 'overview', icon: BarChart3, label: 'Overview' },
              { key: 'users', icon: Users, label: 'Users' },
              { key: 'trades', icon: TrendingUp, label: 'Trades' },
              { key: 'positions', icon: Activity, label: 'Positions' },
              { key: 'funds', icon: DollarSign, label: 'Funds' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeSection === item.key ? 'border-[#D51820] text-[#D51820]' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* OVERVIEW SECTION */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'blue' },
                { label: 'Active Accounts', value: stats?.activeAccounts || 0, icon: CheckCircle, color: 'green' },
                { label: 'Open Positions', value: stats?.openPositions || 0, icon: Activity, color: 'yellow' },
                { label: 'Total P&L', value: `$${totalPnl.toFixed(2)}`, icon: TrendingUp, color: totalPnl >= 0 ? 'green' : 'red' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <stat.icon className={`w-5 h-5 ${stat.color === 'blue' ? 'text-blue-400' : stat.color === 'green' ? 'text-green-400' : stat.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'}`} />
                  </div>
                  <div className="text-2xl font-bold font-mono">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Second Row Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Volume', value: `${totalVolume.toFixed(2)} lots`, icon: BarChart3, color: 'purple' },
                { label: 'Total Deposits', value: `$${stats?.totalDeposits || 0}`, icon: DollarSign, color: 'green' },
                { label: 'Pending Withdrawals', value: stats?.pendingWithdrawals || 0, icon: Clock, color: 'orange' },
                { label: 'Avg Trade Size', value: `${(totalVolume / (allTrades?.length || 1)).toFixed(2)} lots`, icon: ArrowUpDown, color: 'cyan' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <stat.icon className={`w-5 h-5 ${stat.color === 'purple' ? 'text-purple-400' : stat.color === 'green' ? 'text-green-400' : stat.color === 'orange' ? 'text-orange-400' : 'text-cyan-400'}`} />
                  </div>
                  <div className="text-2xl font-bold font-mono">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-sm font-semibold mb-4">Recent Trades</h3>
                <div className="space-y-2">
                  {allTrades?.slice(0, 5).map(trade => (
                    <div key={trade.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${trade.direction === 'buy' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>{trade.direction.toUpperCase()}</span>
                        <span className="text-sm text-white">{trade.symbol}</span>
                      </div>
                      <div className={`text-sm font-mono font-semibold ${Number(trade.netPnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {Number(trade.netPnl) >= 0 ? '+' : ''}${Number(trade.netPnl).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <h3 className="text-sm font-semibold mb-4">Pending Withdrawals</h3>
                <div className="space-y-2">
                  {withdrawals?.filter(w => w.status === 'pending').slice(0, 5).map(w => (
                    <div key={w.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                      <div>
                        <div className="text-sm text-white">${Number(w.amount).toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{w.paymentMethod}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded hover:bg-green-900/80">Approve</button>
                        <button className="text-xs px-2 py-1 bg-red-900/50 text-red-400 rounded hover:bg-red-900/80">Reject</button>
                      </div>
                    </div>
                  ))}
                  {(!withdrawals || withdrawals.filter(w => w.status === 'pending').length === 0) && (
                    <div className="text-center text-gray-500 py-4">No pending withdrawals</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS SECTION */}
        {activeSection === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white w-64 focus:outline-none focus:border-[#D51820]"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400">
                    <th className="text-left px-4 py-3">User</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Role</th>
                    <th className="text-right px-4 py-3">Balance</th>
                    <th className="text-right px-4 py-3">Equity</th>
                    <th className="text-right px-4 py-3">Positions</th>
                    <th className="text-center px-4 py-3">Status</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.users?.map((u: any) => (
                    <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D51820] to-red-800 flex items-center justify-center text-white font-bold text-xs">
                            {(u.name || u.email || 'U').charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">{u.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{u.email || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-purple-900/50 text-purple-400 border border-purple-700' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-white">${Number(u.balance || 0).toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono text-white">${Number(u.equity || 0).toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono text-gray-400">{u.positionCount || 0}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs ${u.isActive ? 'text-green-400' : 'text-red-400'}`}>
                          {u.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => setSelectedUser(u)}
                          className="text-xs text-[#D51820] hover:text-red-400 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Showing {users?.users?.length || 0} of {users?.total || 0} users</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-400 hover:text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={!users?.hasMore}
                  className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-400 hover:text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TRADES SECTION */}
        {activeSection === 'trades' && (
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="text-sm font-semibold mb-4">All Trades</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left py-2">ID</th>
                      <th className="text-left py-2">User</th>
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-right py-2">Dir</th>
                      <th className="text-right py-2">Vol</th>
                      <th className="text-right py-2">Open</th>
                      <th className="text-right py-2">Close</th>
                      <th className="text-right py-2">Gross P&L</th>
                      <th className="text-right py-2">Commission</th>
                      <th className="text-right py-2">Net P&L</th>
                      <th className="text-right py-2">Duration</th>
                      <th className="text-right py-2">Closed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTrades?.map(trade => (
                      <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="py-2 text-gray-500">#{trade.id}</td>
                        <td className="py-2 text-white">User {trade.userId}</td>
                        <td className="py-2 font-semibold text-white">{trade.symbol}</td>
                        <td className={`py-2 text-right ${trade.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{trade.direction.toUpperCase()}</td>
                        <td className="py-2 text-right font-mono text-gray-300">{trade.volume}</td>
                        <td className="py-2 text-right font-mono text-gray-300">{Number(trade.openPrice).toFixed(5)}</td>
                        <td className="py-2 text-right font-mono text-gray-300">{Number(trade.closePrice).toFixed(5)}</td>
                        <td className={`py-2 text-right font-mono ${Number(trade.grossPnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{Number(trade.grossPnl) >= 0 ? '+' : ''}${Number(trade.grossPnl).toFixed(2)}</td>
                        <td className="py-2 text-right font-mono text-gray-400">${Number(trade.commission).toFixed(2)}</td>
                        <td className={`py-2 text-right font-mono font-semibold ${Number(trade.netPnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{Number(trade.netPnl) >= 0 ? '+' : ''}${Number(trade.netPnl).toFixed(2)}</td>
                        <td className="py-2 text-right text-gray-400">{trade.duration ? `${Math.floor(trade.duration / 3600)}h ${Math.floor((trade.duration % 3600) / 60)}m` : '-'}</td>
                        <td className="py-2 text-right text-gray-500">{trade.closedAt ? new Date(trade.closedAt).toLocaleString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* POSITIONS SECTION */}
        {activeSection === 'positions' && (
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="text-sm font-semibold mb-4">All Open Positions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left py-2">ID</th>
                      <th className="text-left py-2">User</th>
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-right py-2">Dir</th>
                      <th className="text-right py-2">Vol</th>
                      <th className="text-right py-2">Open Price</th>
                      <th className="text-right py-2">Current</th>
                      <th className="text-right py-2">SL</th>
                      <th className="text-right py-2">TP</th>
                      <th className="text-right py-2">Unrealized P&L</th>
                      <th className="text-right py-2">Opened</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPositions?.map(pos => (
                      <tr key={pos.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="py-2 text-gray-500">#{pos.id}</td>
                        <td className="py-2 text-white">User {pos.userId}</td>
                        <td className="py-2 font-semibold text-white">{pos.symbol}</td>
                        <td className={`py-2 text-right ${pos.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{pos.direction.toUpperCase()}</td>
                        <td className="py-2 text-right font-mono text-gray-300">{pos.volume}</td>
                        <td className="py-2 text-right font-mono text-gray-300">{Number(pos.openPrice).toFixed(5)}</td>
                        <td className="py-2 text-right font-mono text-gray-300">{Number(pos.currentPrice).toFixed(5)}</td>
                        <td className="py-2 text-right font-mono text-red-400">{pos.stopLoss ? Number(pos.stopLoss).toFixed(2) : '-'}</td>
                        <td className="py-2 text-right font-mono text-green-400">{pos.takeProfit ? Number(pos.takeProfit).toFixed(2) : '-'}</td>
                        <td className={`py-2 text-right font-mono font-semibold ${Number(pos.realizedPnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {Number(pos.realizedPnl) >= 0 ? '+' : ''}${Number(pos.realizedPnl).toFixed(2)}
                        </td>
                        <td className="py-2 text-right text-gray-500">{pos.openedAt ? new Date(pos.openedAt).toLocaleString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FUNDS SECTION */}
        {activeSection === 'funds' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="text-sm font-semibold mb-4">Deposits</h3>
              <div className="space-y-2">
                {deposits?.map(d => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-800/50">
                    <div>
                      <div className="text-sm text-white">${Number(d.amount).toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{d.paymentMethod} · User {d.userId}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${d.status === 'completed' ? 'bg-green-900/50 text-green-400' : d.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="text-sm font-semibold mb-4">Withdrawals</h3>
              <div className="space-y-2">
                {withdrawals?.map(w => (
                  <div key={w.id} className="flex items-center justify-between py-2 border-b border-gray-800/50">
                    <div>
                      <div className="text-sm text-white">${Number(w.amount).toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{w.paymentMethod} · User {w.userId}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${w.status === 'completed' ? 'bg-green-900/50 text-green-400' : w.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>
                        {w.status}
                      </span>
                      {w.status === 'pending' && (
                        <div className="flex gap-1">
                          <button className="p-0.5 text-green-400 hover:bg-green-900/50 rounded">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-0.5 text-red-400 hover:bg-red-900/50 rounded">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
