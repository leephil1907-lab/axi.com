import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import Navbar from '@/sections/Navbar'
import { ChevronLeft, DollarSign, BarChart3 } from 'lucide-react'

export default function TradingDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD')
  const [activeTab, setActiveTab] = useState('positions')
  const [orderDirection, setOrderDirection] = useState<'buy' | 'sell'>('buy')
  const [orderVolume, setOrderVolume] = useState('0.1')

  const { data: account } = trpc.trading.account.useQuery(undefined, { enabled: isAuthenticated })
  const { data: livePrices } = trpc.market.livePrices.useQuery(undefined, { refetchInterval: 3000, enabled: isAuthenticated })
  const { data: positions } = trpc.trading.positions.useQuery(undefined, { refetchInterval: 5000, enabled: isAuthenticated })
  const { data: orders } = trpc.trading.orders.useQuery(undefined, { enabled: isAuthenticated })
  const { data: tradeHistory } = trpc.trading.tradeHistory.useQuery(undefined, { enabled: isAuthenticated })

  const utils = trpc.useUtils()
  const openPosition = trpc.trading.openPosition.useMutation({ onSuccess: () => { utils.trading.positions.invalidate(); utils.trading.account.invalidate() } })
  const closePosition = trpc.trading.closePosition.useMutation({ onSuccess: () => { utils.trading.positions.invalidate(); utils.trading.tradeHistory.invalidate(); utils.trading.account.invalidate() } })
  const cancelOrder = trpc.trading.cancelOrder.useMutation({ onSuccess: () => utils.trading.orders.invalidate() })

  const selectedPrice = livePrices?.find(p => p.instrument.symbol === selectedSymbol)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#D51820]"><ChevronLeft className="w-4 h-4" /> Back</Link>
            <div className="h-6 w-px bg-gray-200" />
            <span className="text-sm font-semibold text-gray-800">Trading Platform</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-gray-500" /><span className="text-gray-600">Balance:</span><span className="font-mono font-semibold">${Number(account?.balance || 0).toFixed(2)}</span></div>
            <div className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-gray-500" /><span className="text-gray-600">Equity:</span><span className="font-mono font-semibold">${Number(account?.equity || 0).toFixed(2)}</span></div>
            <span className="text-xs text-gray-500">Account: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{account?.accountNumber || '---'}</span></span>
          </div>
        </div>
      </div>
      <div className="pt-28 pb-4 px-4 h-screen">
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200"><h3 className="font-semibold text-sm text-gray-800">Watchlist</h3></div>
            <div className="flex-1 overflow-y-auto">
              {livePrices?.map(p => (
                <button key={p.instrument.symbol} onClick={() => setSelectedSymbol(p.instrument.symbol)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left ${selectedSymbol === p.instrument.symbol ? 'bg-red-50 border-l-4 border-l-[#D51820]' : 'border-l-4 border-l-transparent'}`}>
                  <div><div className="text-xs font-semibold text-gray-900">{p.instrument.symbol}</div><div className="text-[10px] text-gray-500">{p.instrument.name}</div></div>
                  <div className="text-right"><div className="font-mono text-xs text-gray-800">{p.bid}</div><div className={`text-[10px] font-medium ${Number(p.change24h) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Number(p.change24h) >= 0 ? '+' : ''}{p.change24hPercent}%</div></div>
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-6 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-200 flex-1 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">{selectedSymbol}</h2>
                  {selectedPrice && <div className="flex items-center gap-2"><span className="font-mono text-lg font-bold">{selectedPrice.bid}</span></div>}
                </div>
                <div className="flex items-center gap-2"><span className="text-xs text-gray-500">H: {selectedPrice?.high24h || '--'}</span><span className="text-xs text-gray-500">L: {selectedPrice?.low24h || '--'}</span></div>
              </div>
              <div className="flex-1 relative bg-gray-900 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                  <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D51820" stopOpacity="0.15"/><stop offset="100%" stopColor="#D51820" stopOpacity="0"/></linearGradient></defs>
                  <path d="M0,280 Q50,270 80,260 120,250 150,230 200,220 250,230 300,200 350,180 400,190 450,170 500,160 550,150 600,140 650,130 700,120 750,110 800,100 L800,400 L0,400 Z" fill="url(#chartFill)" />
                  <path d="M0,280 Q50,270 80,260 120,250 150,230 200,220 250,230 300,200 350,180 400,190 450,170 500,160 550,150 600,140 650,130 700,120 750,110 800,100" fill="none" stroke="#D51820" strokeWidth="2" />
                  {[60,100,140,180,220,260,300,350,400,450,500,550,600,650,700].map((x,i) => {
                    const isGreen = i%3!==0; const bh=15+Math.random()*20; const wh=bh+10+Math.random()*10; const y=100+Math.sin(x/100)*80+Math.random()*40
                    return <g key={i}><line x1={x} y1={y-wh} x2={x} y2={y+wh} stroke={isGreen?'#22c55e':'#ef4444'} strokeWidth="1"/><rect x={x-5} y={isGreen?y-bh:y} width={10} height={bh} fill={isGreen?'#22c55e':'#ef4444'} rx={1}/></g>
                  })}
                </svg>
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {['1m','5m','15m','1H','4H','1D','1W'].map(tf => <button key={tf} className={`px-2 py-0.5 rounded text-[10px] font-medium ${tf==='1H'?'bg-[#D51820] text-white':'bg-gray-800/80 text-gray-400'}`}>{tf}</button>)}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 h-64">
              <div className="flex border-b border-gray-200">
                {[{key:'positions',label:'Positions',count:positions?.length},{key:'orders',label:'Pending Orders',count:orders?.length},{key:'history',label:'History'}].map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab===tab.key?'border-[#D51820] text-[#D51820]':'border-transparent text-gray-600'}`}>{tab.label}{tab.count!==undefined && tab.count>0 && <span className="bg-[#D51820] text-white text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>}</button>
                ))}
              </div>
              <div className="p-4 overflow-y-auto h-[210px]">
                {activeTab==='positions' && (positions?.length ? <table className="w-full text-xs"><thead><tr className="text-gray-500 border-b border-gray-100"><th className="text-left py-2">Symbol</th><th className="text-right">Dir</th><th className="text-right">Vol</th><th className="text-right">Open</th><th className="text-right">Action</th></tr></thead><tbody>{positions.map(pos => <tr key={pos.id} className="border-b border-gray-50"><td className="py-2 font-semibold">{pos.symbol}</td><td className={`text-right ${pos.direction==='buy'?'text-green-600':'text-red-600'}`}>{pos.direction.toUpperCase()}</td><td className="text-right">{pos.volume}</td><td className="text-right font-mono">{Number(pos.openPrice).toFixed(5)}</td><td className="text-right"><button onClick={() => closePosition.mutate({positionId:pos.id})} className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Close</button></td></tr>)}</tbody></table> : <div className="text-center text-gray-400 py-8">No open positions</div>)}
                {activeTab==='orders' && (orders?.length ? <table className="w-full text-xs"><thead><tr className="text-gray-500 border-b border-gray-100"><th className="text-left py-2">Symbol</th><th className="text-right">Type</th><th className="text-right">Dir</th><th className="text-right">Action</th></tr></thead><tbody>{orders.map(o => <tr key={o.id} className="border-b border-gray-50"><td className="py-2 font-semibold">{o.symbol}</td><td className="text-right text-gray-600">{o.orderType}</td><td className={`text-right ${o.direction==='buy'?'text-green-600':'text-red-600'}`}>{o.direction.toUpperCase()}</td><td className="text-right"><button onClick={() => cancelOrder.mutate({orderId:o.id})} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Cancel</button></td></tr>)}</tbody></table> : <div className="text-center text-gray-400 py-8">No pending orders</div>)}
                {activeTab==='history' && (tradeHistory?.length ? <table className="w-full text-xs"><thead><tr className="text-gray-500 border-b border-gray-100"><th className="text-left py-2">Symbol</th><th className="text-right">Dir</th><th className="text-right">Vol</th><th className="text-right">P&L</th></tr></thead><tbody>{tradeHistory.map(t => <tr key={t.id} className="border-b border-gray-50"><td className="py-2 font-semibold">{t.symbol}</td><td className={`text-right ${t.direction==='buy'?'text-green-600':'text-red-600'}`}>{t.direction.toUpperCase()}</td><td className="text-right">{t.volume}</td><td className={`text-right font-mono ${Number(t.netPnl)>=0?'text-green-600':'text-red-600'}`}>{Number(t.netPnl).toFixed(2)}</td></tr>)}</tbody></table> : <div className="text-center text-gray-400 py-8">No trade history</div>)}
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200"><h3 className="font-semibold text-sm text-gray-800">Order Panel</h3></div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Instrument</label>
                <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#D51820]">
                  {livePrices?.map(p => <option key={p.instrument.symbol} value={p.instrument.symbol}>{p.instrument.symbol}</option>)}
                </select>
              </div>
              {selectedPrice && <div className="grid grid-cols-2 gap-2"><div className="bg-red-50 rounded-lg p-3 text-center"><div className="text-[10px] text-red-600 font-medium">SELL</div><div className="font-mono text-lg font-bold text-red-600">{selectedPrice.bid}</div></div><div className="bg-green-50 rounded-lg p-3 text-center"><div className="text-[10px] text-green-600 font-medium">BUY</div><div className="font-mono text-lg font-bold text-green-600">{selectedPrice.ask}</div></div></div>}
              <div><label className="text-xs text-gray-500 mb-1 block">Direction</label><div className="grid grid-cols-2 gap-2"><button onClick={() => setOrderDirection('buy')} className={`py-2 rounded-lg text-sm font-semibold ${orderDirection==='buy'?'bg-green-500 text-white':'bg-gray-100 text-gray-600'}`}>BUY</button><button onClick={() => setOrderDirection('sell')} className={`py-2 rounded-lg text-sm font-semibold ${orderDirection==='sell'?'bg-red-500 text-white':'bg-gray-100 text-gray-600'}`}>SELL</button></div></div>
              <div><label className="text-xs text-gray-500 mb-1 block">Volume (lots)</label><div className="flex items-center gap-2"><button onClick={() => setOrderVolume(Math.max(0.01,Number(orderVolume)-0.01).toFixed(2))} className="w-8 h-8 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">-</button><input type="number" min="0.01" max="100" step="0.01" value={orderVolume} onChange={(e) => setOrderVolume(e.target.value)} className="flex-1 text-center text-sm border border-gray-200 rounded-lg py-2"/><button onClick={() => setOrderVolume((Number(orderVolume)+0.01).toFixed(2))} className="w-8 h-8 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">+</button></div></div>
              <button onClick={() => openPosition.mutate({symbol:selectedSymbol,direction:orderDirection,volume:orderVolume})} disabled={openPosition.isPending} className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${orderDirection==='buy'?'bg-green-500 hover:bg-green-600':'bg-red-500 hover:bg-red-600'}`}>{openPosition.isPending ? 'Placing...' : `${orderDirection.toUpperCase()} ${selectedSymbol}`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}