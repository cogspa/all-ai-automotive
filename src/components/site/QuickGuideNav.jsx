import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const GUIDES = [
  { path: "/alternators", label: "Alternators" },
  { path: "/starters", label: "Starters" },
  { path: "/calipers", label: "Brake Calipers" },
  { path: "/master-cylinders", label: "Master Cylinders" },
  { path: "/brake-pads-rotors", label: "Pads & Rotors" },
  { path: "/boosters", label: "Boosters" },
  { path: "/wheel-hubs", label: "Wheel Hubs" },
];

export default function QuickGuideNav() {
  const loc = useLocation();

  return (
    <div className="mb-12 border-b border-white/10 pb-6">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[14px] text-white/55 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono-cap text-white/40 mr-2">Jump to:</span>
        {GUIDES.map((g) => {
          const isActive = loc.pathname === g.path;
          return (
            <Link
              key={g.path}
              to={g.path}
              className={`px-3 py-1.5 rounded-full text-[13px] transition-colors ${
                isActive 
                  ? "bg-white text-black font-medium" 
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {g.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
