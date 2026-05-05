import React from "react";

const RAIL_THIS_WEEK = [
  { k: "Diagnostic Guides", v: "Symptom-based · 35+ available" },
  { k: "Installation Guides", v: "Step-by-step procedures" },
  { k: "Safety Recalls", v: "Live NHTSA database" },
];

const RAIL_FOLLOW = [
  { k: "LinkedIn", v: "@allaiautomotive" },
  { k: "Twitter / X", v: "@allaiautomotive" },
  { k: "YouTube", v: "/allaiautomotive" },
];

export default function DarkContext() {
  return (
    <section
      className="relative glow-bg grain"
      data-testid="dark-context"
      id="product"
    >
      <div className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 pt-28 md:pt-40 pb-32 md:pb-48">
        <div className="col-span-12 md:col-span-2 md:pt-2">
          <span className="font-mono-cap text-white/50">
            Used by
          </span>
        </div>

        <div className="col-span-12 md:col-span-8">
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(44px, 7.4vw, 112px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Thousands of{" "}
            <span className="italic-display" style={{ color: "#efe1d8" }}>
              repair shops.
            </span>
          </h2>
          <p className="mt-8 max-w-[520px] text-white/65 text-[15px] leading-relaxed font-normal">
            Independent mechanics, dealerships, and DIYers trusting ALL AI AUTOMOTIVE across diagnostics, installations, and safety recalls. Quietly, daily.
          </p>

          <div className="mt-32 md:mt-44">
            <span className="font-mono-cap text-white/50">The automotive moment</span>
            <h3
              className="mt-4 font-display text-white"
              style={{
                fontSize: "clamp(36px, 5.4vw, 80px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Built by mechanics for the shops that{" "}
              <span className="italic-display" style={{ color: "#e5d2c6" }}>
                actually fix
              </span>{" "}
              the cars.
            </h3>
            <p className="mt-7 max-w-[560px] text-white/65 text-[15px] leading-relaxed font-normal">
              ALL AI AUTOMOTIVE started inside a small shop that loved the work and hated the fragmented data. Same team, two years later — building the knowledge base they couldn&rsquo;t find anywhere else.
            </p>
            <a
              href="#search"
              className="mt-7 inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <span className="font-mono-cap">Start searching</span>
              <span className="h-px w-12 bg-white/40" />
            </a>
          </div>
        </div>

        <aside
          className="col-span-12 md:col-span-2 hidden md:flex flex-col gap-12 pt-2"
        >
          <RailGroup label="Available Now" items={RAIL_THIS_WEEK} />
          <RailGroup label="Follow" items={RAIL_FOLLOW} />
          <div>
            <span className="font-mono-cap text-white/50">Contact</span>
            <a
              href="mailto:support@allaiautomotive.com"
              className="mt-3 block text-[14px] text-white/85 hover:text-white"
            >
              support@allaiautomotive.com
            </a>
            <p className="mt-7 font-mono-cap text-white/40">
              Est. 2024 — 2026
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function RailGroup({ label, items }) {
  return (
    <div>
      <span className="font-mono-cap text-white/50">{label}</span>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li
            key={it.k}
            className="flex flex-col"
          >
            <span className="text-[13.5px] text-white/85">{it.k}</span>
            <span className="text-[12px] text-white/45">{it.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
