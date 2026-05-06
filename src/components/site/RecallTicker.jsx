import React from "react";
import { ArrowRight } from "lucide-react";
import RECENT_RECALLS from "../../data/recent-recalls.json";

export default function RecallTicker() {
  // Duplicate items to ensure smooth infinite scrolling
  const items = [...RECENT_RECALLS, ...RECENT_RECALLS, ...RECENT_RECALLS];

  return (
    <div className="w-full border-t border-b flex items-center h-12 overflow-hidden" style={{ background: "#060607", borderColor: "rgba(255,255,255,0.08)" }}>
      {/* Left static badge */}
      <div className="flex-shrink-0 h-full px-4 md:px-6 flex items-center gap-2 border-r z-10" style={{ background: "#060607", borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="font-mono-cap text-white/80 text-[11px] md:text-[12px] tracking-wider">
          LIVE RECALLS
        </span>
      </div>

      {/* Scrolling Ticker */}
      <div className="flex-1 overflow-hidden h-full flex items-center relative ticker-mask">
        <div className="animate-ticker items-center gap-12 px-6">
          {items.map((r, i) => (
            <a 
              key={`${r.id}-${i}`} 
              href={r.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 whitespace-nowrap group transition-opacity hover:opacity-75"
            >
              <span className="font-mono-cap text-[#dc3545] text-[11px] px-1.5 py-0.5 rounded-sm" style={{ background: "rgba(220,53,69,0.15)" }}>
                {r.id}
              </span>
              <span className="text-[13px] font-medium text-white/90 group-hover:underline">
                {r.make} {r.model}
              </span>
              <span className="text-[13px] text-white/50">
                — {r.issue}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Right static CTA */}
      <a 
        href="/#recalls"
        className="flex-shrink-0 h-full px-4 md:px-6 flex items-center gap-2 border-l z-10 transition-colors group"
        style={{ background: "#060607", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="font-mono-cap text-white/80 text-[11px] md:text-[12px] tracking-wider hidden sm:block">
          CHECK VIN
        </span>
        <ArrowRight className="h-3 w-3 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </a>
    </div>
  );
}
