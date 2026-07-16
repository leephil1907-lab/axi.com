import { ReactNode, useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import RiskWarning from "../sections/RiskWarning";
import LoginModal from "./LoginModal";
import LiveChat from "./LiveChat";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EDE8E0" }}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <RiskWarning />
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSignUp={() => { setLoginOpen(false); window.location.hash = "#/open-account"; }}
      />
      <LiveChat />
    </div>
  );
}
