import React from "react";
import { ArrowUpRight } from "lucide-react";

const QUICK_GUIDES = [
  {
    n: "01",
    t: "Alternators",
    d: "Complete guide to diagnosing and replacing your alternator.",
    href: "/alternators",
    tags: ["Electrical", "Charging"],
  },
  {
    n: "02",
    t: "Starters",
    d: "Step-by-step procedures for starter motor replacement.",
    href: "/starters",
    tags: ["Electrical", "Ignition"],
  },
  {
    n: "03",
    t: "Brake Calipers",
    d: "Detailed instructions for brake caliper inspection and replacement.",
    href: "/calipers",
    tags: ["Brakes", "Hydraulics"],
  },
  {
    n: "04",
    t: "Master Cylinders",
    d: "Master cylinder bleeding and installation procedures.",
    href: "/master-cylinders",
    tags: ["Brakes", "Hydraulics"],
  },
  {
    n: "05",
    t: "Brake Pads & Rotors",
    d: "Comprehensive guide for replacing brake pads and rotors.",
    href: "/brake-pads-rotors",
    tags: ["Brakes", "Friction"],
  },
  {
    n: "06",
    t: "Brake Boosters",
    d: "Diagnose and replace vacuum or hydraulic brake boosters.",
    href: "/boosters",
    tags: ["Brakes", "Vacuum"],
  },
  {
    n: "07",
    t: "Wheel Hubs",
    d: "Wheel hub assembly and bearing replacement guides.",
    href: "/wheel-hubs",
    tags: ["Suspension", "Drivetrain"],
  },
];

export default function Pillars() {
  return (
    <section
      id="guides"
      className="relative"
      style={{ background: "var(--c-cream)", color: "var(--c-ink)" }}
    >
      <div className="grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 pt-28 md:pt-40 pb-24">
        <div className="col-span-12 md:col-span-2">
          <span className="font-mono-cap" style={{ color: "rgba(10,10,10,0.55)" }}>
            Quick Guides
          </span>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(40px, 6.4vw, 96px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              color: "var(--c-ink)",
            }}
          >
            Direct access to the most <span className="italic-display">common repairs.</span>
          </h2>
          <p
            className="mt-6 max-w-[640px] text-[15px] leading-relaxed font-normal"
            style={{ color: "rgba(10,10,10,0.62)" }}
          >
            Seven quick guides for the most frequently replaced components. Detailed step-by-step instructions so you can focus on the fix.
          </p>
        </div>

        <div className="col-span-12 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {QUICK_GUIDES.map((p, i) => (
            <a
              key={p.n}
              href={p.href}
              className="pillar-card rounded-3xl p-7 md:p-9 block transition-transform hover:-translate-y-1 hover:shadow-xl group"
              style={{
                background: i % 2 === 0 ? "var(--c-cream-2)" : "var(--c-blush)",
                border: "1px solid rgba(10,10,10,0.07)",
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-mono-cap"
                  style={{ color: "rgba(10,10,10,0.55)" }}
                >
                  {p.n}
                </span>
                <span
                  className="font-mono-cap group-hover:text-[#0a0a0a] transition-colors"
                  style={{ color: "rgba(10,10,10,0.4)" }}
                >
                  <ArrowUpRight className="h-4 w-4 inline-block" />
                </span>
              </div>
              <h3
                className="mt-10 font-display"
                style={{
                  fontSize: "clamp(26px, 2.7vw, 38px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {p.t}
              </h3>
              <p
                className="mt-5 text-[14.5px] leading-relaxed font-normal"
                style={{ color: "rgba(10,10,10,0.62)" }}
              >
                {p.d}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-cap px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(10,10,10,0.06)",
                      color: "rgba(10,10,10,0.7)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
