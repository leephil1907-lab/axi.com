import { Routes, Route } from 'react-router'
import { LocaleProvider } from '@/hooks/useLocale'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import TradingDashboard from './pages/TradingDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Funds from './pages/Funds'
import DepositsWithdrawals from './pages/DepositsWithdrawals'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <LocaleProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trading" element={<TradingDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/deposits" element={<DepositsWithdrawals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LocaleProvider>
  )
}