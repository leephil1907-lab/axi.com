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

// ── Core Pages ────────────────────────────────────────────
const HomePage = lazy(() => import("./pages/HomePage"));
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Login = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const SignUp = lazy(() => import("./pages/SignUp"));
const OpenAccountPage = lazy(() => import("./pages/OpenAccountPage"));

// ── Markets ───────────────────────────────────────────────
const MarketsPage = lazy(() => import("./pages/MarketsPage"));
const ForexPage = lazy(() => import("./pages/ForexPage"));
const SharesPage = lazy(() => import("./pages/SharesPage"));
const IPOsPage = lazy(() => import("./pages/IPOsPage"));
const IndicesPage = lazy(() => import("./pages/IndicesPage"));
const CommoditiesPage = lazy(() => import("./pages/CommoditiesPage"));
const CryptoPage = lazy(() => import("./pages/CryptoPage"));
const CryptoCFDsPage = lazy(() => import("./pages/CryptoCFDsPage"));
const CryptoFuturesPage = lazy(() => import("./pages/CryptoFuturesPage"));
const BuyCryptoPage = lazy(() => import("./pages/BuyCryptoPage"));

// ── Trading Platforms ─────────────────────────────────────
const PlatformsPage = lazy(() => import("./pages/PlatformsPage"));
const AxiTradingPlatformPage = lazy(() => import("./pages/AxiTradingPlatformPage"));
const CopyTradingAppPage = lazy(() => import("./pages/CopyTradingAppPage"));
const MT4TradingPage = lazy(() => import("./pages/MT4TradingPage"));
const MT4WebTraderPage = lazy(() => import("./pages/MT4WebTraderPage"));
const MT5TradingPage = lazy(() => import("./pages/MT5TradingPage"));
const MT5WebTraderPage = lazy(() => import("./pages/MT5WebTraderPage"));
const AIAnalystPage = lazy(() => import("./pages/AIAnalystPage"));
const TradingCalculatorsPage = lazy(() => import("./pages/TradingCalculatorsPage"));
const TradingToolsPage = lazy(() => import("./pages/TradingToolsPage"));

// ── Trading Accounts ──────────────────────────────────────
const AxiSelectPage = lazy(() => import("./pages/AxiSelectPage"));
const DemoAccountPage = lazy(() => import("./pages/DemoAccountPage"));
const StandardAccountPage = lazy(() => import("./pages/StandardAccountPage"));
const ProAccountPage = lazy(() => import("./pages/ProAccountPage"));
const EliteAccountPage = lazy(() => import("./pages/EliteAccountPage"));
const SpreadBettingPage = lazy(() => import("./pages/SpreadBettingPage"));
const SwapFreeAccountPage = lazy(() => import("./pages/SwapFreeAccountPage"));

// ── Learn to Trade ────────────────────────────────────────
const LearnToTradePage = lazy(() => import("./pages/LearnToTradePage"));
const MT4VideoTutorialsPage = lazy(() => import("./pages/MT4VideoTutorialsPage"));
const FreeEBooksPage = lazy(() => import("./pages/FreeEBooksPage"));
const AxiAcademyPage = lazy(() => import("./pages/AxiAcademyPage"));
const TradingGlossaryPage = lazy(() => import("./pages/TradingGlossaryPage"));
const CryptoGlossaryPage = lazy(() => import("./pages/CryptoGlossaryPage"));
const AxiBlogPage = lazy(() => import("./pages/AxiBlogPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// ── Partnerships ──────────────────────────────────────────
const PartnershipsPage = lazy(() => import("./pages/PartnershipsPage"));
const IntroducingBrokersPage = lazy(() => import("./pages/IntroducingBrokersPage"));
const AffiliateProgramPage = lazy(() => import("./pages/AffiliateProgramPage"));
const HybridProgramPage = lazy(() => import("./pages/HybridProgramPage"));
const MT4PAMMPage = lazy(() => import("./pages/MT4PAMMPage"));
const MT4MAMPage = lazy(() => import("./pages/MT4MAMPage"));

// ── Company ───────────────────────────────────────────────
const CompanyPage = lazy(() => import("./pages/CompanyPage"));
const AboutAxiPage = lazy(() => import("./pages/AboutAxiPage"));
const OurTeamPage = lazy(() => import("./pages/OurTeamPage"));
const OurPurposePage = lazy(() => import("./pages/OurPurposePage"));
const SponsorshipPage = lazy(() => import("./pages/SponsorshipPage"));
const AxiCommunityPage = lazy(() => import("./pages/AxiCommunityPage"));
const CSRPage = lazy(() => import("./pages/CSRPage"));
const InvestorRelationsPage = lazy(() => import("./pages/InvestorRelationsPage"));
const CompanyNewsPage = lazy(() => import("./pages/CompanyNewsPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));

// ── Dashboard & Trading ───────────────────────────────────
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TradingDashboard = lazy(() => import("./pages/TradingDashboard"));
const FundsPage = lazy(() => import("./pages/FundsPage"));
const UserDepositPage = lazy(() => import("./pages/UserDepositPage"));
const UserWithdrawalPage = lazy(() => import("./pages/UserWithdrawalPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

// ── Support ───────────────────────────────────────────────
const HelpCenterPage = lazy(() => import("./pages/HelpCenterPage"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// ── Legal & Compliance ────────────────────────────────────
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RiskDisclosure = lazy(() => import("./pages/RiskDisclosure"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const GDPRCompliance = lazy(() => import("./pages/GDPRCompliance"));
const AMLPolicy = lazy(() => import("./pages/AMLPolicy"));
const KYCPolicy = lazy(() => import("./pages/KYCPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const ComplaintsProcedure = lazy(() => import("./pages/ComplaintsProcedure"));
const ConflictsOfInterest = lazy(() => import("./pages/ConflictsOfInterest"));
const BestExecutionPolicy = lazy(() => import("./pages/BestExecutionPolicy"));
const LeveragePolicy = lazy(() => import("./pages/LeveragePolicy"));
const NegativeBalanceProtection = lazy(() => import("./pages/NegativeBalanceProtection"));
const InvestorCompensation = lazy(() => import("./pages/InvestorCompensation"));
const RegulatoryInformation = lazy(() => import("./pages/RegulatoryInformation"));
const Licenses = lazy(() => import("./pages/Licenses"));
const FeesSchedule = lazy(() => import("./pages/FeesSchedule"));
const TradingHours = lazy(() => import("./pages/TradingHours"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const DepositsWithdrawals = lazy(() => import("./pages/DepositsWithdrawals"));

// ── 404 ───────────────────────────────────────────────────
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
                {/* ── Core Pages ─────────────────────────── */}
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login-old" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/open-account" element={<OpenAccountPage />} />

                {/* ── Markets ──────────────────────────── */}
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/markets/forex" element={<ForexPage />} />
                <Route path="/markets/shares" element={<SharesPage />} />
                <Route path="/markets/ipos" element={<IPOsPage />} />
                <Route path="/markets/indices" element={<IndicesPage />} />
                <Route path="/markets/commodities" element={<CommoditiesPage />} />
                <Route path="/markets/crypto" element={<CryptoPage />} />
                <Route path="/markets/crypto-cfds" element={<CryptoCFDsPage />} />
                <Route path="/markets/crypto-futures" element={<CryptoFuturesPage />} />
                <Route path="/markets/buy-crypto" element={<BuyCryptoPage />} />

                {/* ── Trading Platforms ────────────────── */}
                <Route path="/platforms" element={<PlatformsPage />} />
                <Route path="/platforms/axi-trading-platform" element={<AxiTradingPlatformPage />} />
                <Route path="/platforms/copy-trading" element={<CopyTradingAppPage />} />
                <Route path="/platforms/mt4" element={<MT4TradingPage />} />
                <Route path="/platforms/mt4-webtrader" element={<MT4WebTraderPage />} />
                <Route path="/platforms/mt5" element={<MT5TradingPage />} />
                <Route path="/platforms/mt5-webtrader" element={<MT5WebTraderPage />} />
                <Route path="/platforms/ai-analyst" element={<AIAnalystPage />} />
                <Route path="/platforms/trading-calculators" element={<TradingCalculatorsPage />} />
                <Route path="/trading-tools" element={<TradingToolsPage />} />

                {/* ── Trading Accounts ─────────────────── */}
                <Route path="/accounts/axi-select" element={<AxiSelectPage />} />
                <Route path="/axi-select" element={<AxiSelectPage />} />
                <Route path="/accounts/demo" element={<DemoAccountPage />} />
                <Route path="/accounts/standard" element={<StandardAccountPage />} />
                <Route path="/accounts/pro" element={<ProAccountPage />} />
                <Route path="/accounts/elite" element={<EliteAccountPage />} />
                <Route path="/accounts/spread-betting" element={<SpreadBettingPage />} />
                <Route path="/accounts/swap-free" element={<SwapFreeAccountPage />} />

                {/* ── Learn to Trade ───────────────────── */}
                <Route path="/learn" element={<LearnToTradePage />} />
                <Route path="/learn/mt4-tutorials" element={<MT4VideoTutorialsPage />} />
                <Route path="/learn/ebooks" element={<FreeEBooksPage />} />
                <Route path="/learn/academy" element={<AxiAcademyPage />} />
                <Route path="/learn/trading-glossary" element={<TradingGlossaryPage />} />
                <Route path="/learn/crypto-glossary" element={<CryptoGlossaryPage />} />
                <Route path="/learn/blog" element={<AxiBlogPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* ── Partnerships ─────────────────────── */}
                <Route path="/partnerships" element={<PartnershipsPage />} />
                <Route path="/partnerships/introducing-brokers" element={<IntroducingBrokersPage />} />
                <Route path="/partnerships/affiliate" element={<AffiliateProgramPage />} />
                <Route path="/partnerships/hybrid" element={<HybridProgramPage />} />
                <Route path="/partnerships/mt4-pamm" element={<MT4PAMMPage />} />
                <Route path="/partnerships/mt4-mam" element={<MT4MAMPage />} />

                {/* ── Company ──────────────────────────── */}
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/company/about" element={<AboutAxiPage />} />
                <Route path="/company/team" element={<OurTeamPage />} />
                <Route path="/company/purpose" element={<OurPurposePage />} />
                <Route path="/company/sponsorship" element={<SponsorshipPage />} />
                <Route path="/company/community" element={<AxiCommunityPage />} />
                <Route path="/company/csr" element={<CSRPage />} />
                <Route path="/company/investor-relations" element={<InvestorRelationsPage />} />
                <Route path="/company/news" element={<CompanyNewsPage />} />
                <Route path="/company/careers" element={<CareersPage />} />

                {/* ── Dashboard & Trading ──────────────── */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/trading" element={<TradingDashboard />} />
                <Route path="/funds" element={<FundsPage />} />
                <Route path="/deposit" element={<UserDepositPage />} />
                <Route path="/withdrawal" element={<UserWithdrawalPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* ── Admin ────────────────────────────── */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin-v2" element={<AdminDashboardPage />} />
                <Route path="/leaderboard" element={<AxiSelectPage />} />

                {/* ── Support ──────────────────────────── */}
                <Route path="/help" element={<HelpCenterPage />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* ── Legal & Compliance ───────────────── */}
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/risk-disclosure" element={<RiskDisclosure />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
                <Route path="/aml-policy" element={<AMLPolicy />} />
                <Route path="/kyc-policy" element={<KYCPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/complaints-procedure" element={<ComplaintsProcedure />} />
                <Route path="/conflicts-of-interest" element={<ConflictsOfInterest />} />
                <Route path="/best-execution-policy" element={<BestExecutionPolicy />} />
                <Route path="/leverage-policy" element={<LeveragePolicy />} />
                <Route path="/negative-balance-protection" element={<NegativeBalanceProtection />} />
                <Route path="/investor-compensation" element={<InvestorCompensation />} />
                <Route path="/regulatory-information" element={<RegulatoryInformation />} />
                <Route path="/licenses" element={<Licenses />} />
                <Route path="/fees-schedule" element={<FeesSchedule />} />
                <Route path="/trading-hours" element={<TradingHours />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/deposits-withdrawals" element={<DepositsWithdrawals />} />

                {/* ── 404 ──────────────────────────────── */}
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
