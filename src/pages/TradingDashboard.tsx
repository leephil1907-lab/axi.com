import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import Navbar from '@/sections/Navbar'
import { 
  ChevronLeft, DollarSign, BarChart3, TrendingUp, TrendingDown, 
  Activity, Bell, Settings, Copy, Users, Calendar, Newspaper,
  ChevronUp, ChevronDown, X, Plus, Minus, Eye, EyeOff, Zap,
  Layers, Target, Clock, AlertTriangle, CheckCircle2, XCircle
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────
interface ChartDataPoint {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface Indicator {
  id: string
  name: string
  type: 'ma' | 'ema' | 'rsi' | 'macd' | 'bollinger'
  params: Record<string, number>
  active: boolean
}

// ── Technical Indicator Calculator ─────────────────────────
function calculateMA(data: ChartDataPoint[], period: number): number[] {
  const result: number[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(NaN); continue }
    let sum = 0
    for (let j = 0; j < period; j++) sum += data[i - j].close
    result.push(sum / period)
  }
  return result
}

function calculateEMA(data: ChartDataPoint[], period: number): number[] {
  const result: number[] = []
  const multiplier = 2 / (period + 1)
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(NaN); continue }
    if (i === period - 1) { result.push(calculateMA(data.slice(0, period), period)[period - 1]); continue }
    result.push((data[i].close - result[i - 1]) * multiplier + result[i - 1])
  }
  return result
}

function calculateRSI(data: ChartDataPoint[], period: number): number[] {
  const result: number[] = []
  let avgGain = 0, avgLoss = 0
  for (let i = 1; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close
    const gain = change > 0 ? change : 0
    const loss = change < 0 ? -change : 0
    if (i < period) { avgGain += gain; avgLoss += loss; result.push(NaN); continue }
    if (i === period) { avgGain = avgGain / period; avgLoss = avgLoss / period }
    else { avgGain = (avgGain * (period - 1) + gain) / period; avgLoss = (avgLoss * (period - 1) + loss) / period }
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss
    result.push(100 - 100 / (1 + rs))
  }
  result.unshift(NaN)
  return result
}

// ── Generate Candlestick Data ────────────────────────────
function generateCandleData(basePrice: number, count: number = 100): ChartDataPoint[] {
  const data: ChartDataPoint[] = []
  let price = basePrice
  const now = Date.now()
  for (let i = 0; i < count; i++) {
    const volatility = price * 0.002
    const open = price + (Math.random() - 0.5) * volatility * 0.3
    const close = open + (Math.random() - 0.5) * volatility
    const high = Math.max(open, close) + Math.random() * volatility * 0.4
    const low = Math.min(open, close) - Math.random() * volatility * 0.4
    data.push({
      time: now - (count - i) * 60000,
      open, high, low, close,
      volume: Math.floor(Math.random() * 1000 + 500)
    })
    price = close
  }
  return data
}

// ── SVG Candlestick Chart Component ──────────────────────
function CandlestickChart({ 
  data, 
  indicators, 
  timeframe, 
  selectedPrice 
}: { 
  data: ChartDataPoint[]
  indicators: Indicator[]
  timeframe: string
  selectedPrice?: { bid: string; ask: string } 
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverData, setHoverData] = useState<ChartDataPoint | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const padding = { top: 20, right: 60, bottom: 40, left: 10 }
  const width = 800
  const height = 400
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const prices = data.map(d => d.close)
  const minPrice = Math.min(...data.map(d => d.low)) * 0.999
  const maxPrice = Math.max(...data.map(d => d.high)) * 1.001
  const priceRange = maxPrice - minPrice

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth
  const yScale = (price: number) => padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight

  // Calculate indicator values
  const ma20 = indicators.find(i => i.id === 'ma20')?.active ? calculateMA(data, 20) : []
  const ma50 = indicators.find(i => i.id === 'ma50')?.active ? calculateMA(data, 50) : []
  const ema12 = indicators.find(i => i.id === 'ema12')?.active ? calculateEMA(data, 12) : []
  const rsi = indicators.find(i => i.id === 'rsi14')?.active ? calculateRSI(data, 14) : []

  const candleWidth = chartWidth / data.length * 0.7

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    const index = Math.round(((x - padding.left) / chartWidth) * (data.length - 1))
    if (index >= 0 && index < data.length) {
      setHoverData(data[index])
    }
  }

  const handleMouseLeave = () => setHoverData(null)

  return (
    <div className="relative w-full h-full">
      <svg 
        ref={svgRef}
        className="w-full h-full" 
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid */}
        {Array.from({ length: 8 }).map((_, i) => {
          const y = padding.top + (i / 7) * chartHeight
          return (
            <g key={`grid-${i}`}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#374151" strokeWidth="0.5" strokeDasharray="4,4" />
              <text x={width - padding.right + 5} y={y + 3} fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                {(maxPrice - (i / 7) * priceRange).toFixed(5)}
              </text>
            </g>
          )
        })}

        {/* Volume bars */}
        <g opacity="0.3">
          {data.map((d, i) => {
            const volHeight = (d.volume / Math.max(...data.map(d => d.volume))) * (chartHeight * 0.15)
            return (
              <rect 
                key={`vol-${i}`}
                x={xScale(i) - candleWidth / 2}
                y={padding.top + chartHeight - volHeight}
                width={candleWidth}
                height={volHeight}
                fill={d.close >= d.open ? '#22c55e' : '#ef4444'}
              />
            )
          })}
        </g>

        {/* Candlesticks */}
        {data.map((d, i) => {
          const isGreen = d.close >= d.open
          const color = isGreen ? '#22c55e' : '#ef4444'
          const bodyTop = yScale(Math.max(d.open, d.close))
          const bodyBottom = yScale(Math.min(d.open, d.close))
          const bodyHeight = Math.max(1, bodyBottom - bodyTop)

          return (
            <g key={`candle-${i}`}>
              <line x1={xScale(i)} y1={yScale(d.high)} x2={xScale(i)} y2={yScale(d.low)} stroke={color} strokeWidth="1" />
              <rect 
                x={xScale(i) - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={color}
                rx={1}
              />
            </g>
          )
        })}

        {/* MA 20 */}
        {ma20.length > 0 && (
          <path 
            d={ma20.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ')}
            fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.8"
          />
        )}

        {/* MA 50 */}
        {ma50.length > 0 && (
          <path 
            d={ma50.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ')}
            fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.8"
          />
        )}

        {/* EMA 12 */}
        {ema12.length > 0 && (
          <path 
            d={ema12.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ')}
            fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.8"
          />
        )}

        {/* Crosshair */}
        {hoverData && (
          <g>
            <line x1={xScale(data.indexOf(hoverData))} y1={padding.top} x2={xScale(data.indexOf(hoverData))} y2={padding.top + chartHeight} stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="4,4" />
            <line x1={padding.left} y1={mousePos.y} x2={width - padding.right} y2={mousePos.y} stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="4,4" />
          </g>
        )}

        {/* Time axis */}
        {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((d, i) => (
          <text key={`time-${i}`} x={xScale(data.indexOf(d))} y={height - 10} fill="#9CA3AF" fontSize="9" textAnchor="middle" fontFamily="monospace">
            {new Date(d.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </text>
        ))}
      </svg>

      {/* Hover Tooltip */}
      {hoverData && (
        <div className="absolute top-2 left-2 bg-gray-900/95 border border-gray-700 rounded-lg p-3 text-xs font-mono z-10 pointer-events-none shadow-xl">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-gray-400">O:</span><span className={hoverData.open >= hoverData.close ? 'text-green-400' : 'text-red-400'}>{hoverData.open.toFixed(5)}</span>
            <span className="text-gray-400">H:</span><span className="text-gray-200">{hoverData.high.toFixed(5)}</span>
            <span className="text-gray-400">L:</span><span className="text-gray-200">{hoverData.low.toFixed(5)}</span>
            <span className="text-gray-400">C:</span><span className={hoverData.close >= hoverData.open ? 'text-green-400' : 'text-red-400'}>{hoverData.close.toFixed(5)}</span>
            <span className="text-gray-400">Vol:</span><span className="text-gray-200">{hoverData.volume.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* RSI Panel */}
      {rsi.length > 0 && (
        <div className="absolute bottom-0 left-0 right-[60px] h-16 bg-gray-900/80 border-t border-gray-700">
          <svg className="w-full h-full" viewBox={`0 0 ${width} 60`} preserveAspectRatio="none">
            <line x1={padding.left} y1={15} x2={width - padding.right} y2={15} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1={padding.left} y1={45} x2={width - padding.right} y2={45} stroke="#22c55e" strokeWidth="0.5" strokeDasharray="2,2" />
            <path 
              d={rsi.filter((_, i) => !isNaN(_)).map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${60 - v * 0.6}`).join(' ')}
              fill="none" stroke="#EC4899" strokeWidth="1.5"
            />
          </svg>
          <div className="absolute right-1 top-1 text-[8px] text-gray-400 font-mono">RSI</div>
        </div>
      )}
    </div>
  )
}

// ── Social Trading Card ──────────────────────────────────
function TraderCard({ trader }: { trader: { id: number; name: string; avatar: string; roi: number; followers: number; trades: number; winRate: number; risk: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D51820] to-red-800 flex items-center justify-center text-white font-bold text-sm">
          {trader.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">{trader.name}</div>
          <div className="text-xs text-gray-400">{trader.trades} trades · {trader.winRate}% win</div>
        </div>
        <div className={`text-right ${trader.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          <div className="text-sm font-bold font-mono">{trader.roi >= 0 ? '+' : ''}{trader.roi}%</div>
          <div className="text-[10px] text-gray-500">30d ROI</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Users className="w-3 h-3" />
          <span>{trader.followers.toLocaleString()}</span>
        </div>
        <div className="text-xs text-gray-400">Risk: <span className={trader.risk === 'Low' ? 'text-green-400' : trader.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}>{trader.risk}</span></div>
        <button 
          onClick={() => setIsFollowing(!isFollowing)}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${isFollowing ? 'bg-gray-700 text-gray-300' : 'bg-[#D51820] text-white hover:bg-red-700'}`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  )
}

// ── Economic Calendar Event ──────────────────────────────
function CalendarEvent({ event }: { event: { time: string; currency: string; impact: 'high' | 'medium' | 'low'; title: string; forecast: string; previous: string; actual?: string } }) {
  const impactColors = { high: 'bg-red-500', medium: 'bg-yellow-500', low: 'bg-green-500' }
  const impactLabels = { high: 'High', medium: 'Medium', low: 'Low' }

  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
      <div className="text-xs font-mono text-gray-400 w-12">{event.time}</div>
      <div className={`w-2 h-2 rounded-full ${impactColors[event.impact]}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-white truncate">{event.title}</div>
        <div className="text-[10px] text-gray-500">{event.currency}</div>
      </div>
      <div className="text-right text-xs font-mono">
        <div className="text-gray-400">F: {event.forecast}</div>
        <div className="text-gray-500">P: {event.previous}</div>
        {event.actual && <div className={Number(event.actual) > Number(event.forecast) ? 'text-green-400' : 'text-red-400'}>A: {event.actual}</div>}
      </div>
    </div>
  )
}

// ── News Card ──────────────────────────────────────────────
function NewsCard({ news }: { news: { title: string; summary: string; source: string; time: string; category: string } }) {
  return (
    <div className="py-2 border-b border-gray-800 last:border-0 cursor-pointer hover:bg-gray-800/50 transition-colors rounded px-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">{news.category}</span>
        <span className="text-[10px] text-gray-500">{news.source}</span>
        <span className="text-[10px] text-gray-600">{news.time}</span>
      </div>
      <div className="text-xs text-white font-medium leading-snug">{news.title}</div>
      <div className="text-[10px] text-gray-400 mt-1 line-clamp-2">{news.summary}</div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────
export default function TradingDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD')
  const [activeTab, setActiveTab] = useState('positions')
  const [orderDirection, setOrderDirection] = useState<'buy' | 'sell'>('buy')
  const [orderVolume, setOrderVolume] = useState('0.1')
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market')
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [timeframe, setTimeframe] = useState('1H')
  const [showIndicators, setShowIndicators] = useState(false)
  const [rightPanel, setRightPanel] = useState<'order' | 'social' | 'news' | 'calendar'>('order')
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [indicators, setIndicators] = useState<Indicator[]>([
    { id: 'ma20', name: 'MA 20', type: 'ma', params: { period: 20 }, active: true },
    { id: 'ma50', name: 'MA 50', type: 'ma', params: { period: 50 }, active: false },
    { id: 'ema12', name: 'EMA 12', type: 'ema', params: { period: 12 }, active: false },
    { id: 'rsi14', name: 'RSI 14', type: 'rsi', params: { period: 14 }, active: false },
  ])
  const [showPipCalc, setShowPipCalc] = useState(false)
  const [notifications, setNotifications] = useState<{id: number; message: string; type: 'success' | 'error' | 'info'; time: number}[]>([])

  const { data: account } = trpc.trading.account.useQuery(undefined, { enabled: isAuthenticated })
  const { data: livePrices } = trpc.market.livePrices.useQuery(undefined, { refetchInterval: 3000, enabled: isAuthenticated })
  const { data: positions } = trpc.trading.positions.useQuery(undefined, { refetchInterval: 5000, enabled: isAuthenticated })
  const { data: orders } = trpc.trading.orders.useQuery(undefined, { enabled: isAuthenticated })
  const { data: tradeHistory } = trpc.trading.tradeHistory.useQuery(undefined, { enabled: isAuthenticated })

  const utils = trpc.useUtils()
  const openPosition = trpc.trading.openPosition.useMutation({ 
    onSuccess: () => { 
      addNotification('Position opened successfully', 'success')
      utils.trading.positions.invalidate(); utils.trading.account.invalidate() 
    },
    onError: (err) => addNotification(err.message, 'error')
  })
  const closePosition = trpc.trading.closePosition.useMutation({ 
    onSuccess: () => { 
      addNotification('Position closed', 'success')
      utils.trading.positions.invalidate(); utils.trading.tradeHistory.invalidate(); utils.trading.account.invalidate() 
    },
    onError: (err) => addNotification(err.message, 'error')
  })
  const cancelOrder = trpc.trading.cancelOrder.useMutation({ 
    onSuccess: () => { 
      addNotification('Order cancelled', 'info')
      utils.trading.orders.invalidate() 
    },
    onError: (err) => addNotification(err.message, 'error')
  })
  const createOrder = trpc.trading.createOrder.useMutation({
    onSuccess: () => {
      addNotification('Order created successfully', 'success')
      utils.trading.orders.invalidate()
    },
    onError: (err) => addNotification(err.message, 'error')
  })

  const selectedPrice = livePrices?.find(p => p.instrument.symbol === selectedSymbol)

  // Generate chart data when symbol changes
  useEffect(() => {
    if (selectedPrice) {
      const base = parseFloat(selectedPrice.bid)
      setChartData(generateCandleData(base, 100))
    }
  }, [selectedSymbol, selectedPrice, timeframe])

  // Update chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedPrice && chartData.length > 0) {
        const last = chartData[chartData.length - 1]
        const newPrice = parseFloat(selectedPrice.bid)
        const newCandle: ChartDataPoint = {
          time: Date.now(),
          open: last.close,
          high: Math.max(last.close, newPrice),
          low: Math.min(last.close, newPrice),
          close: newPrice,
          volume: Math.floor(Math.random() * 1000 + 500)
        }
        setChartData(prev => [...prev.slice(1), newCandle])
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [selectedPrice, chartData])

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type, time: Date.now() }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }

  const toggleIndicator = (id: string) => {
    setIndicators(prev => prev.map(i => i.id === id ? { ...i, active: !i.active } : i))
  }

  const handlePlaceOrder = () => {
    if (!selectedSymbol || !orderVolume) return
    const vol = parseFloat(orderVolume)
    if (isNaN(vol) || vol <= 0) {
      addNotification('Invalid volume', 'error')
      return
    }

    if (orderType === 'market') {
      openPosition.mutate({
        symbol: selectedSymbol,
        direction: orderDirection,
        volume: vol,
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      })
    } else {
      createOrder.mutate({
        symbol: selectedSymbol,
        orderType: orderType === 'limit' ? 'limit' : 'stop',
        direction: orderDirection,
        volume: vol,
        entryPrice: limitPrice ? parseFloat(limitPrice) : undefined,
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      })
    }
  }

  // Calculate P&L for positions
  const calculatePnL = (pos: any) => {
    if (!selectedPrice) return 0
    const currentPrice = parseFloat(orderDirection === 'buy' ? selectedPrice.ask : selectedPrice.bid)
    const openPrice = parseFloat(pos.openPrice)
    const volume = parseFloat(pos.volume)
    const pipValue = 0.0001 // Simplified

    if (pos.direction === 'buy') {
      return (currentPrice - openPrice) * volume * 100000
    } else {
      return (openPrice - currentPrice) * volume * 100000
    }
  }

  // Mock social traders
  const mockTraders = [
    { id: 1, name: 'AlphaTrader', avatar: '', roi: 34.5, followers: 1243, trades: 456, winRate: 68, risk: 'Medium' },
    { id: 2, name: 'CryptoKing', avatar: '', roi: 52.1, followers: 2891, trades: 234, winRate: 71, risk: 'High' },
    { id: 3, name: 'ForexMaster', avatar: '', roi: 18.3, followers: 567, trades: 890, winRate: 62, risk: 'Low' },
    { id: 4, name: 'SwingPro', avatar: '', roi: 28.7, followers: 1890, trades: 123, winRate: 75, risk: 'Medium' },
  ]

  // Mock calendar events
  const mockEvents = [
    { time: '08:30', currency: 'USD', impact: 'high' as const, title: 'Non-Farm Payrolls', forecast: '185K', previous: '175K', actual: '192K' },
    { time: '10:00', currency: 'EUR', impact: 'medium' as const, title: 'ECB Interest Rate Decision', forecast: '4.50%', previous: '4.50%' },
    { time: '14:30', currency: 'USD', impact: 'high' as const, title: 'Fed Chair Powell Speech', forecast: '-', previous: '-' },
    { time: '16:00', currency: 'GBP', impact: 'low' as const, title: 'Manufacturing PMI', forecast: '46.2', previous: '45.8' },
  ]

  // Mock news
  const mockNews = [
    { title: 'Gold hits new all-time high as inflation fears persist', summary: 'Gold prices surged to a new record high as investors seek safe-haven assets amid persistent inflation concerns.', source: 'Reuters', time: '2h ago', category: 'Metals' },
    { title: 'EUR/USD breaks above 1.09 on dovish Fed expectations', summary: 'The euro strengthened against the dollar as markets price in potential rate cuts from the Federal Reserve.', source: 'Bloomberg', time: '4h ago', category: 'Forex' },
    { title: 'Bitcoin ETF inflows reach $500M in single day', summary: 'Spot Bitcoin ETFs saw record inflows as institutional investors increase allocation to digital assets.', source: 'CoinDesk', time: '6h ago', category: 'Crypto' },
    { title: 'Oil prices stabilize after OPEC+ production decision', summary: 'Crude oil prices found support as OPEC+ members agreed to maintain current production cuts through Q3.', source: 'CNBC', time: '8h ago', category: 'Commodities' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-sm animate-in slide-in-from-right ${n.type === 'success' ? 'bg-green-900/90 border border-green-700 text-green-100' : n.type === 'error' ? 'bg-red-900/90 border border-red-700 text-red-100' : 'bg-blue-900/90 border border-blue-700 text-blue-100'}`}>
            {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : n.type === 'error' ? <XCircle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            {n.message}
          </div>
        ))}
      </div>

      {/* Top Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#D51820] transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <div className="h-6 w-px bg-gray-700" />
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#D51820]" />
              <span className="text-sm font-semibold text-white">Trading Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Balance:</span>
              <span className="font-mono font-semibold text-white">${Number(account?.balance || 0).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">Equity:</span>
              <span className="font-mono font-semibold text-white">${Number(account?.equity || 0).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">Margin:</span>
              <span className="font-mono font-semibold text-white">${Number(account?.marginUsed || 0).toFixed(2)}</span>
            </div>
            <span className="text-xs text-gray-500">Account: <span className="font-mono bg-gray-800 px-2 py-0.5 rounded text-gray-300">{account?.accountNumber || '---'}</span></span>
          </div>
        </div>
      </div>

      <div className="pt-28 pb-4 px-4 h-screen">
        <div className="grid grid-cols-12 gap-4 h-full">

          {/* Left Panel - Watchlist */}
          <div className="col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
            <div className="px-3 py-2.5 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold text-xs text-gray-300 uppercase tracking-wider">Watchlist</h3>
              <Settings className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-gray-300" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {livePrices?.map(p => (
                <button 
                  key={p.instrument.symbol} 
                  onClick={() => setSelectedSymbol(p.instrument.symbol)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors text-left ${selectedSymbol === p.instrument.symbol ? 'bg-gray-800/80 border-l-2 border-l-[#D51820]' : 'border-l-2 border-l-transparent'}`}
                >
                  <div>
                    <div className="text-xs font-semibold text-white">{p.instrument.symbol}</div>
                    <div className="text-[10px] text-gray-500">{p.instrument.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-white">{p.bid}</div>
                    <div className={`text-[10px] font-medium ${Number(p.change24h) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {Number(p.change24h) >= 0 ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />}
                      {p.change24hPercent}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center Panel - Chart & Tabs */}
          <div className="col-span-7 flex flex-col gap-3">
            {/* Chart Header */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 flex-1 flex flex-col overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-white">{selectedSymbol}</h2>
                  {selectedPrice && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">Bid</span>
                        <span className="font-mono text-sm font-bold text-green-400">{selectedPrice.bid}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">Ask</span>
                        <span className="font-mono text-sm font-bold text-red-400">{selectedPrice.ask}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">Spread</span>
                        <span className="font-mono text-xs text-yellow-400">{selectedPrice.spread}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">H: {selectedPrice?.high24h || '--'}</span>
                    <span className="text-xs text-gray-500">L: {selectedPrice?.low24h || '--'}</span>
                  </div>
                  <div className="flex gap-1">
                    {['1m','5m','15m','1H','4H','1D','1W'].map(tf => (
                      <button 
                        key={tf} 
                        onClick={() => setTimeframe(tf)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${tf === timeframe ? 'bg-[#D51820] text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowIndicators(!showIndicators)}
                    className={`p-1 rounded transition-colors ${showIndicators ? 'bg-[#D51820] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Indicators Panel */}
              {showIndicators && (
                <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                  <span className="text-xs text-gray-400 mr-1">Indicators:</span>
                  {indicators.map(ind => (
                    <button
                      key={ind.id}
                      onClick={() => toggleIndicator(ind.id)}
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${ind.active ? 'bg-blue-900/50 text-blue-300 border border-blue-700' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Chart Area */}
              <div className="flex-1 relative bg-gray-950 overflow-hidden">
                <CandlestickChart 
                  data={chartData} 
                  indicators={indicators} 
                  timeframe={timeframe}
                  selectedPrice={selectedPrice}
                />
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 h-64">
              <div className="flex border-b border-gray-800">
                {[
                  { key: 'positions', label: 'Positions', count: positions?.length },
                  { key: 'orders', label: 'Pending Orders', count: orders?.length },
                  { key: 'history', label: 'History' },
                ].map(tab => (
                  <button 
                    key={tab.key} 
                    onClick={() => setActiveTab(tab.key)} 
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-[#D51820] text-[#D51820]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                  >
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="bg-[#D51820] text-white text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-3 overflow-y-auto h-[210px]">
                {activeTab === 'positions' && (
                  positions?.length ? (
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-500 border-b border-gray-800">
                          <th className="text-left py-2">Symbol</th>
                          <th className="text-right">Dir</th>
                          <th className="text-right">Vol</th>
                          <th className="text-right">Open</th>
                          <th className="text-right">Current</th>
                          <th className="text-right">P&L</th>
                          <th className="text-right">SL/TP</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map(pos => {
                          const pnl = calculatePnL(pos)
                          return (
                            <tr key={pos.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                              <td className="py-2 font-semibold text-white">{pos.symbol}</td>
                              <td className={`text-right ${pos.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{pos.direction.toUpperCase()}</td>
                              <td className="text-right text-gray-300">{pos.volume}</td>
                              <td className="text-right font-mono text-gray-300">{Number(pos.openPrice).toFixed(5)}</td>
                              <td className="text-right font-mono text-gray-300">{Number(pos.currentPrice).toFixed(5)}</td>
                              <td className={`text-right font-mono font-semibold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                              </td>
                              <td className="text-right text-gray-500">
                                {pos.stopLoss ? <span className="text-red-400">{Number(pos.stopLoss).toFixed(2)}</span> : '-'}
                                <span className="text-gray-600 mx-1">/</span>
                                {pos.takeProfit ? <span className="text-green-400">{Number(pos.takeProfit).toFixed(2)}</span> : '-'}
                              </td>
                              <td className="text-right">
                                <button 
                                  onClick={() => closePosition.mutate({ positionId: pos.id })} 
                                  className="text-xs bg-red-900/50 text-red-400 border border-red-800 px-2 py-1 rounded hover:bg-red-900/80 transition-colors"
                                >
                                  Close
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No open positions
                    </div>
                  )
                )}
                {activeTab === 'orders' && (
                  orders?.length ? (
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-500 border-b border-gray-800">
                          <th className="text-left py-2">Symbol</th>
                          <th className="text-right">Type</th>
                          <th className="text-right">Dir</th>
                          <th className="text-right">Vol</th>
                          <th className="text-right">Entry</th>
                          <th className="text-right">SL/TP</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                            <td className="py-2 font-semibold text-white">{o.symbol}</td>
                            <td className="text-right text-gray-400 uppercase">{o.orderType}</td>
                            <td className={`text-right ${o.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{o.direction.toUpperCase()}</td>
                            <td className="text-right text-gray-300">{o.volume}</td>
                            <td className="text-right font-mono text-gray-300">{o.entryPrice ? Number(o.entryPrice).toFixed(5) : 'Market'}</td>
                            <td className="text-right text-gray-500">
                              {o.stopLoss ? <span className="text-red-400">{Number(o.stopLoss).toFixed(2)}</span> : '-'}
                              <span className="text-gray-600 mx-1">/</span>
                              {o.takeProfit ? <span className="text-green-400">{Number(o.takeProfit).toFixed(2)}</span> : '-'}
                            </td>
                            <td className="text-right">
                              <button 
                                onClick={() => cancelOrder.mutate({ orderId: o.id })} 
                                className="text-xs bg-gray-800 text-gray-400 border border-gray-700 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No pending orders
                    </div>
                  )
                )}
                {activeTab === 'history' && (
                  tradeHistory?.length ? (
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-500 border-b border-gray-800">
                          <th className="text-left py-2">Symbol</th>
                          <th className="text-right">Dir</th>
                          <th className="text-right">Vol</th>
                          <th className="text-right">Open</th>
                          <th className="text-right">Close</th>
                          <th className="text-right">P&L</th>
                          <th className="text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tradeHistory.map(trade => (
                          <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                            <td className="py-2 font-semibold text-white">{trade.symbol}</td>
                            <td className={`text-right ${trade.direction === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{trade.direction.toUpperCase()}</td>
                            <td className="text-right text-gray-300">{trade.volume}</td>
                            <td className="text-right font-mono text-gray-300">{Number(trade.openPrice).toFixed(5)}</td>
                            <td className="text-right font-mono text-gray-300">{Number(trade.closePrice).toFixed(5)}</td>
                            <td className={`text-right font-mono font-semibold ${Number(trade.netPnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {Number(trade.netPnl) >= 0 ? '+' : ''}${Number(trade.netPnl).toFixed(2)}
                            </td>
                            <td className="text-right text-gray-500">
                              {trade.closedAt ? new Date(trade.closedAt).toLocaleString() : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No trade history
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-3 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
            {/* Right Panel Tabs */}
            <div className="flex border-b border-gray-800">
              {[
                { key: 'order', icon: Zap, label: 'Trade' },
                { key: 'social', icon: Users, label: 'Social' },
                { key: 'calendar', icon: Calendar, label: 'Calendar' },
                { key: 'news', icon: Newspaper, label: 'News' },
              ].map(tab => (
                <button 
                  key={tab.key} 
                  onClick={() => setRightPanel(tab.key as any)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors ${rightPanel === tab.key ? 'text-[#D51820] border-b-2 border-[#D51820]' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {/* Order Panel */}
              {rightPanel === 'order' && (
                <div className="space-y-3">
                  {/* Order Type */}
                  <div className="flex gap-1 bg-gray-800 rounded-lg p-0.5">
                    {(['market', 'limit', 'stop'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`flex-1 py-1.5 text-[10px] font-medium rounded-md transition-colors uppercase ${orderType === type ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Direction */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setOrderDirection('buy')}
                      className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${orderDirection === 'buy' ? 'bg-green-600 text-white shadow-lg shadow-green-900/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      BUY
                    </button>
                    <button 
                      onClick={() => setOrderDirection('sell')}
                      className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${orderDirection === 'sell' ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      <TrendingDown className="w-4 h-4 inline mr-1" />
                      SELL
                    </button>
                  </div>

                  {/* Volume */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Volume (lots)</label>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setOrderVolume(Math.max(0.01, parseFloat(orderVolume) - 0.01).toFixed(2))}
                        className="p-1.5 rounded bg-gray-800 text-gray-400 hover:bg-gray-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input 
                        type="number" 
                        step="0.01" 
                        min="0.01" 
                        max="100"
                        value={orderVolume}
                        onChange={(e) => setOrderVolume(e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-white text-center focus:outline-none focus:border-[#D51820]"
                      />
                      <button 
                        onClick={() => setOrderVolume((parseFloat(orderVolume) + 0.01).toFixed(2))}
                        className="p-1.5 rounded bg-gray-800 text-gray-400 hover:bg-gray-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Limit/Stop Price */}
                  {(orderType === 'limit' || orderType === 'stop') && (
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">{orderType === 'limit' ? 'Limit Price' : 'Stop Price'}</label>
                      <input 
                        type="number" 
                        step="0.00001"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        placeholder={`Current: ${selectedPrice?.bid || '---'}`}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#D51820]"
                      />
                    </div>
                  )}

                  {/* Stop Loss */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Stop Loss</label>
                    <input 
                      type="number" 
                      step="0.00001"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#D51820]"
                    />
                  </div>

                  {/* Take Profit */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Take Profit</label>
                    <input 
                      type="number" 
                      step="0.00001"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#D51820]"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-800 rounded-lg p-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Margin Required</span>
                      <span className="font-mono text-white">${(parseFloat(orderVolume || '0') * 1000).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Commission</span>
                      <span className="font-mono text-white">${(parseFloat(orderVolume || '0') * 3.5).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Spread Cost</span>
                      <span className="font-mono text-white">${(parseFloat(selectedPrice?.spread || '0') * parseFloat(orderVolume || '0') * 100000).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={openPosition.isPending || createOrder.isPending}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${orderDirection === 'buy' ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {openPosition.isPending || createOrder.isPending ? 'Processing...' : `${orderDirection === 'buy' ? 'BUY' : 'SELL'} ${selectedSymbol}`}
                  </button>

                  {/* Pip Calculator Toggle */}
                  <button 
                    onClick={() => setShowPipCalc(!showPipCalc)}
                    className="w-full text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 py-1"
                  >
                    <CalculatorIcon className="w-3 h-3" />
                    Pip Calculator
                  </button>

                  {showPipCalc && (
                    <div className="bg-gray-800 rounded-lg p-3 space-y-2">
                      <PipCalculator symbol={selectedSymbol} price={selectedPrice} />
                    </div>
                  )}
                </div>
              )}

              {/* Social Trading Panel */}
              {rightPanel === 'social' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Top Traders</h3>
                    <span className="text-[10px] text-gray-500">Last 30 days</span>
                  </div>
                  {mockTraders.map(trader => (
                    <TraderCard key={trader.id} trader={trader} />
                  ))}
                  <button className="w-full py-2 text-xs text-[#D51820] border border-[#D51820]/30 rounded-lg hover:bg-[#D51820]/10 transition-colors">
                    View All Traders
                  </button>
                </div>
              )}

              {/* Calendar Panel */}
              {rightPanel === 'calendar' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Economic Calendar</h3>
                    <span className="text-[10px] text-gray-500">Today</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {['All', 'High', 'Medium', 'Low'].map(filter => (
                      <button key={filter} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors">
                        {filter}
                      </button>
                    ))}
                  </div>
                  {mockEvents.map((event, i) => (
                    <CalendarEvent key={i} event={event} />
                  ))}
                </div>
              )}

              {/* News Panel */}
              {rightPanel === 'news' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Market News</h3>
                    <span className="text-[10px] text-gray-500">Live</span>
                  </div>
                  {mockNews.map((news, i) => (
                    <NewsCard key={i} news={news} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Pip Calculator Component ─────────────────────────────
function PipCalculator({ symbol, price }: { symbol: string; price?: { bid: string; ask: string } }) {
  const [lotSize, setLotSize] = useState('1')
  const [pipCount, setPipCount] = useState('10')

  const pipValue = parseFloat(lotSize) * 10
  const totalValue = pipValue * parseFloat(pipCount || '0')

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <label className="text-[10px] text-gray-400">Lot Size</label>
        <input 
          type="number" 
          step="0.01"
          value={lotSize}
          onChange={(e) => setLotSize(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs font-mono text-white"
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] text-gray-400">Pips</label>
        <input 
          type="number" 
          value={pipCount}
          onChange={(e) => setPipCount(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs font-mono text-white"
        />
      </div>
      <div className="flex justify-between text-xs pt-1 border-t border-gray-700">
        <span className="text-gray-400">Value per pip:</span>
        <span className="font-mono text-white">${pipValue.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">Total:</span>
        <span className="font-mono text-green-400">${totalValue.toFixed(2)}</span>
      </div>
    </div>
  )
}

function CalculatorIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="14" /><path d="M16 18h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" />
    </svg>
  )
}
