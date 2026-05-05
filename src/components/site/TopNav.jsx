import React, { useEffect, useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

const NAV = [
  { label: "Quick Guides", href: "/#guides" },
  { label: "Knowledge Hub", href: "/#process" },
  { label: "Recalls", href: "/#recalls" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="top-nav"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="flex items-start justify-between gap-3 px-5 md:px-8 pt-5 md:pt-6">
        <a
          href="/"
          data-testid="brand-mark"
          className="pointer-events-auto flex items-center gap-2.5 group"
        >
          <span
            className="flex items-center justify-center h-8 w-8 rounded-full text-white"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Plus
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
            />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[15px] font-display tracking-tight text-white">
              ALL AI AUTOMOTIVE
            </span>
            <span className="font-mono-cap text-white/55">
              Diagnostic · operating system
            </span>
          </span>
        </a>

        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-all duration-300`}
          style={{
            background: "rgba(8,8,9,0.72)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(14px)",
          }}
          data-testid="primary-nav"
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-[13px] text-white/85 hover:text-white hover:bg-white/[0.06] transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#search"
          className="pointer-events-auto pill pill-light"
        >
          Start Search
          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-[#0a0a0a] text-white">
            <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
          </span>
        </a>
      </div>
    </header>
  );
}
