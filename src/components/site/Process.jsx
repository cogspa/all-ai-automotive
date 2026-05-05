import React from "react";

const STEPS = [
  {
    n: "01",
    label: "step 1 / 4",
    t: "Identify",
    d: "Enter symptoms or OBD-II codes into the Knowledge Hub to instantly surface the most likely causes and associated TSBs.",
    tags: ["Symptoms", "Codes", "Search"],
  },
  {
    n: "02",
    label: "step 2 / 4",
    t: "Diagnose",
    d: "Review diagnostic flowcharts and testing procedures to pinpoint the exact component failure before replacing any parts.",
    tags: ["Testing", "Flowcharts", "Pinpoint"],
  },
  {
    n: "03",
    label: "step 3 / 4",
    t: "Execute",
    d: "Follow step-by-step installation guides with factory torque specs and tool requirements to complete the repair safely.",
    tags: ["Install", "Torque", "Tools"],
  },
  {
    n: "04",
    label: "step 4 / 4",
    t: "Verify",
    d: "Clear the codes, perform any required relearn procedures, and test drive the vehicle to verify the repair was successful.",
    tags: ["Clear Codes", "Relearn", "Test Drive"],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative"
      style={{ background: "var(--c-cream-2)", color: "var(--c-ink)" }}
    >
      <div className="grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-24 md:py-32 border-t" style={{ borderColor: "rgba(10,10,10,0.08)"}}>
        <div className="col-span-12 md:col-span-4">
          <span className="font-mono-cap" style={{ color: "rgba(10,10,10,0.55)" }}>
            Process
          </span>
          <h2
            className="mt-4 font-display"
            style={{
              fontSize: "clamp(40px, 5.2vw, 76px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            From symptom to{" "}
            <span className="italic-display">fixed,</span> every day.
          </h2>
          <p
            className="mt-5 text-[14px] font-mono-cap"
            style={{ color: "rgba(10,10,10,0.55)" }}
          >
            Four steps · repair correctly
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="rounded-3xl p-7 md:p-8"
              style={{
                background: "var(--c-cream)",
                border: "1px solid rgba(10,10,10,0.07)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-[34px] md:text-[42px]" style={{ letterSpacing: "-0.02em" }}>
                  {s.n}
                </span>
                <span className="font-mono-cap" style={{ color: "rgba(10,10,10,0.55)" }}>
                  {s.label}
                </span>
              </div>
              <h3
                className="mt-5 font-display"
                style={{
                  fontSize: "clamp(24px, 2.4vw, 34px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.t}
              </h3>
              <p
                className="mt-4 text-[14.5px] leading-relaxed font-normal"
                style={{ color: "rgba(10,10,10,0.62)" }}
              >
                {s.d}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono-cap px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(10,10,10,0.05)",
                      color: "rgba(10,10,10,0.7)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
