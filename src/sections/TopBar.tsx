import { Search, Globe, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface TopBarProps {
  onLoginClick: () => void;
}

export default function TopBar({ onLoginClick }: TopBarProps) {
  return (
    <div className="w-full h-[40px] flex items-center justify-between px-6" style={{ backgroundColor: "#D31C2B" }}>
      <div className="flex items-center gap-0">
        <button className="flex items-center gap-1 text-white hover:opacity-80 transition-opacity">
          <span className="text-[11px] font-semibold uppercase tracking-[1.5px]">Quick Links</span>
          <ChevronDown size={12} className="text-white" />
        </button>
        <span className="text-white/50 mx-3">|</span>
        <button onClick={onLoginClick} className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white hover:underline">
          Login
        </button>
        <span className="text-white/50 mx-3">|</span>
        <Link to="/help" className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white hover:underline">
          Help Centre
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white hover:opacity-80 transition-opacity">
          <Search size={16} />
        </button>
        <button className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity">
          <Globe size={14} />
          <span className="text-[11px] font-semibold uppercase tracking-[1.5px]">EN</span>
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}
