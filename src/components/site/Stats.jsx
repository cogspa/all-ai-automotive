import React, { useEffect, useRef, useState } from "react";

// Each stat is sourced. The `animate` flag controls whether the Counter
// counts up (numeric stats) or just renders the value as text (e.g. "9 in 10").
const STATS = [
  {
    value: 66,
    suffix: "%",
    animate: true,
    label: "of U.S. drivers don't trust auto repair shops in general",
    source: "AAA — 2016, corroborated by 2021 & 2023 follow-up surveys",
  },
  {
    value: "9 in 10",
    animate: false,
    label: "Americans say they've been — or may have been — overcharged for a repair",
    source: "Jerry consumer survey, 2023",
  },
  {
    value: 285,
    suffix: "M",
    animate: true,
    label: "vehicles on U.S. roads, with an average age of over 12 years",
    source: "U.S. DOT / S&P Global Mobility, 2023",
  },
  {
    value: 23,
    suffix: "%",
    animate: true,
    label: "rise in repair costs in 2023 — four times the rate of general inflation",
    source: "U.S. Bureau of Labor Statistics, CPI Motor Vehicle Maintenance",
  },
];

function Counter({ value, suffix, animate }) {
  const [shown, setShown] = useState(animate ? 0 : value);
  const ref = useRef(null);

  useEffect(() => {
    if (!animate) return;
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1600;
            const tick = (now) => {
              const t = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - t, 3);
              setShown(value * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value, animate]);

  if (!animate) {
    return (
      <span ref={ref} className="font-display" data-testid="stat-counter">
        {value}
      </span>
    );
  }

  const isFloat = value % 1 !== 0;
  const display = isFloat ? shown.toFixed(1) : Math.round(shown).toLocaleString();
  return (
    <span ref={ref} className="font-display tabular-nums" data-testid="stat-counter">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      className="relative glow-bg grain"
      data-testid="stats-section"
    >
      <div className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-28 md:py-40">
        <div className="col-span-12 md:col-span-4">
          <span className="font-mono-cap text-white/55">The mission</span>
          <h2
            className="mt-4 font-display text-white"
            style={{
              fontSize: "clamp(40px, 5.2vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            Auto repair runs on guesswork.{" "}
            <span className="italic-display" style={{ color: "#efe1d8" }}>
              We're building the missing source of truth.
            </span>
          </h2>
          <p className="mt-6 max-w-[420px] text-[14.5px] leading-relaxed font-normal text-white/65">
            Most drivers don't trust their mechanic. The next most common source of repair information is friends and family — people who know no more than the drivers themselves. ALL AI AUTOMOTIVE is the third option: independent, AI-powered guidance backed by technical bulletins, OE service data, and live recall information.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-7 md:p-8 count-up flex flex-col"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="text-white"
                style={{
                  fontSize: "clamp(58px, 6vw, 96px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                <Counter value={s.value} suffix={s.suffix} animate={s.animate} />
              </div>
              <p className="mt-6 max-w-[340px] text-[14px] text-white/70 leading-snug font-normal">
                {s.label}
              </p>
              <p className="mt-auto pt-6 font-mono-cap text-white/35 text-[10px]">
                Source · {s.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
