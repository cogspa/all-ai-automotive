import React, { useEffect, useRef, useState } from "react";

const STATS = [
  { n: 14000, suffix: "+", label: "vehicles covered across all makes and models" },
  { n: 35, suffix: "", label: "diagnostic and installation guides available" },
  { n: 2.5, suffix: "×", label: "faster diagnosis time on average" },
  { n: 7, suffix: "", label: "major component categories covered" },
];

function Counter({ value, suffix }) {
  const [shown, setShown] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
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
  }, [value]);

  const isFloat = value % 1 !== 0;
  const display = isFloat
    ? shown.toFixed(1)
    : Math.round(shown).toLocaleString();
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
          <span className="font-mono-cap text-white/55">The scale</span>
          <h2
            className="mt-4 font-display text-white"
            style={{
              fontSize: "clamp(40px, 5.2vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            Thousands of vehicles covered,{" "}
            <span className="italic-display" style={{ color: "#efe1d8" }}>
              one complete knowledge base.
            </span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-7 md:p-8 count-up"
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
                <Counter value={s.n} suffix={s.suffix} />
              </div>
              <p className="mt-6 max-w-[300px] text-[14px] text-white/62 leading-snug font-normal">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
