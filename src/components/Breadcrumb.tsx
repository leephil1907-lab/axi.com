import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 py-4">
      <Link to="/" className="flex items-center gap-1 hover:text-[#D51820]">
        <Home className="w-4 h-4" /> Home
      </Link>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {i === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.name}</span>
          ) : (
            <Link to={item.url} className="hover:text-[#D51820]">{item.name}</Link>
          )}
        </div>
      ))}
    </nav>
  );
}
