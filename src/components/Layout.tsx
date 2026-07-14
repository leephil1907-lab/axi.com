import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import RiskWarning from "../sections/RiskWarning";
import LoginModal from "./LoginModal";
import LiveChat from "./LiveChat";

 export function Layout() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EDE8E0" }}>
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ setLoginOpen }} />
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
