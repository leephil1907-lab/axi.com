import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import { TRPCProvider } from "./providers/trpc";
import { AuthProvider } from "./hooks/useAuth";
import { I18nProvider } from "./hooks/useI18n";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import TopBar from "./sections/TopBar";
import LiveChat from "./components/LiveChat";
import { Toaster } from "sonner";

// ── Lazy load pages ───────────────────────────────────────
const MT4TradingPage = lazy(() => import("./pages/MT4TradingPage"));
const MT5TradingPage = lazy(() => import("./pages/MT5TradingPage"));
const AxiSelectPage = lazy(() => import("./pages/AxiSelectPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TradingDashboard = lazy(() => import("./pages/TradingDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const FundsPage = lazy(() => import("./pages/FundsPage"));
const DepositWithdrawPage = lazy(() => import("./pages/DepositWithdrawPage"));
const UserDepositPage = lazy(() => import("./pages/UserDepositPage"));
const UserWithdrawalPage = lazy(() => import("./pages/UserWithdrawalPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const MarketsPage = lazy(() => import("./pages/MarketsPage"));
const ForexPage = lazy(() => import("./pages/ForexPage"));
const CryptoPage = lazy(() => import("./pages/CryptoPage"));
const CommoditiesPage = lazy(() => import("./pages/CommoditiesPage"));
const IndicesPage = lazy(() => import("./pages/IndicesPage"));
const SharesPage = lazy(() => import("./pages/SharesPage"));
const TradingToolsPage = lazy(() => import("./pages/TradingToolsPage"));
const PlatformsPage = lazy(() => import("./pages/PlatformsPage"));
const LearnToTradePage = lazy(() => import("./pages/LearnToTradePage"));
const PartnershipsPage = lazy(() => import("./pages/PartnershipsPage"));
const CompanyPage = lazy(() => import("./pages/CompanyPage"));
const HelpCenterPage = lazy(() => import("./pages/HelpCenterPage"));
const OpenAccountPage = lazy(() => import("./pages/OpenAccountPage"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <TRPCProvider>
      <AuthProvider>
        <I18nProvider>
          <BrowserRouter>
            <TopBar />
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]"><div className="animate-spin w-8 h-8 border-2 border-[#D51820] border-t-transparent rounded-full" /></div>}>
              <Routes>
                                {/* MT4/MT5 Trading Pages */}
                <Route path="/platforms/mt4" element={<MT4TradingPage />} />
                <Route path="/platforms/mt5" element={<MT5TradingPage />} />

                {/* Landing Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/markets/forex" element={<ForexPage />} />
                <Route path="/markets/crypto" element={<CryptoPage />} />
                <Route path="/markets/commodities" element={<CommoditiesPage />} />
                <Route path="/markets/indices" element={<IndicesPage />} />
                <Route path="/markets/shares" element={<SharesPage />} />
                <Route path="/trading-tools" element={<TradingToolsPage />} />
                <Route path="/platforms" element={<PlatformsPage />} />
                <Route path="/learn" element={<LearnToTradePage />} />
                <Route path="/partnerships" element={<PartnershipsPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/help" element={<HelpCenterPage />} />
                <Route path="/open-account" element={<OpenAccountPage />} />

                {/* Auth Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login-old" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Trading Dashboard */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/trading" element={<TradingDashboard />} />

                {/* Funds */}
                <Route path="/funds" element={<FundsPage />} />
                <Route path="/deposit-withdraw" element={<DepositWithdrawPage />} />
                <Route path="/deposit" element={<UserDepositPage />} />
                <Route path="/withdrawal" element={<UserWithdrawalPage />} />

                {/* Settings */}
                <Route path="/settings" element={<SettingsPage />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin-v2" element={<AdminDashboardPage />} />
                <Route path="/axi-select" element={<AxiSelectPage />} />
                <Route path="/leaderboard" element={<AxiSelectPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
            <LiveChat />
            <Toaster position="top-right" richColors />
          </BrowserRouter>
        </I18nProvider>
      </AuthProvider>
    </TRPCProvider>
  );
}

export default App;
