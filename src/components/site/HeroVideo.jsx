import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";

const VIDEO_SRC_MP4 = "/headspin.mp4?v=2";
const VIDEO_SRC_WEBM = "/headspin.webm";

const CUE_POINTS = [
  {
    time: 0.05,
    eyebrow: "01 — Identify",
    titleLead: "Find the fix ",
    titleAccent: "before",
    titleTail: " you touch the wrench.",
    sub: "ALL AI AUTOMOTIVE is the operating layer for shops and DIYers that move fast without losing the craft. Symptoms, diagnostics, and repairs in one quiet surface.",
  },
  {
    time: 1.2,
    eyebrow: "02 — Search",
    titleLead: "Every diagnostic lands ",
    titleAccent: "shaped",
    titleTail: ".",
    sub: "Inputs, symptoms and TSBs enter as living documents. Nothing important hides in a forum thread again.",
  },
  {
    time: 2.4,
    eyebrow: "03 — Execute",
    titleLead: "Repairs stop ",
    titleAccent: "fragmenting",
    titleTail: ".",
    sub: "One canvas for torque specs, required tools, and time-stamped installation steps — wired to the repair, not a parallel inbox.",
  },
  {
    time: 3.6,
    eyebrow: "04 — Maintain",
    titleLead: "Cadence finds ",
    titleAccent: "itself",
    titleTail: ".",
    sub: "Maintenance runs underneath the shop, not on top of the mechanics. Fewer status meetings, more shipped work.",
  },
  {
    time: 4.8,
    eyebrow: "05 — Ship",
    titleLead: "Make repairs that ",
    titleAccent: "matter",
    titleTail: ", on time.",
    sub: "Thousands of mechanics already shipping their best quarters with ALL AI AUTOMOTIVE.",
  },
];

const lerp = (a, b, t) => a + (b - a) * t;

export default function HeroVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(CUE_POINTS[0].time);
  const rafRef = useRef(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const update = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    let cancelled = false;

    const prime = async () => {
      try {
        await v.play();
        v.pause();
        v.currentTime = CUE_POINTS[0].time;
      } catch {
        try { v.currentTime = CUE_POINTS[0].time; } catch {}
      }
      if (!cancelled) setVideoReady(true);
    };

    const onMeta = () => { if (!cancelled) prime(); };
    const onError = () => { if (!cancelled) setVideoReady(false); };

    if (v.readyState >= 1) { prime(); }
    else {
      v.addEventListener("loadedmetadata", onMeta, { once: true });
      v.addEventListener("error", onError, { once: true });
    }

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("error", onError);
    };
  }, []);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    const p = total > 0 ? passed / total : 0;
    setProgress(p);

    const idx = Math.min(
      CUE_POINTS.length - 1,
      Math.max(0, Math.round(p * (CUE_POINTS.length - 1)))
    );
    setStepIndex(idx);
    targetTimeRef.current = CUE_POINTS[idx].time;
  }, []);

  useEffect(() => {
    const tick = () => {
      const v = videoRef.current;
      if (v && videoReady) {
        const target = targetTimeRef.current;
        const cur = v.currentTime;
        const diff = target - cur;
        if (reducedMotion) {
          if (Math.abs(diff) > 0.01) v.currentTime = target;
        } else if (Math.abs(diff) > 0.004) {
          v.currentTime = lerp(cur, target, 0.16);
        } else if (Math.abs(diff) > 0) {
          v.currentTime = target;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion, videoReady]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const cue = CUE_POINTS[stepIndex];

  return (
    <section ref={sectionRef} id="top" className="hero-wrap">
      <div className="hero-sticky">
        <video ref={videoRef} className="hero-video" muted playsInline preload="auto" tabIndex={-1} aria-hidden="true">
          <source src={VIDEO_SRC_WEBM} type="video/webm" />
          <source src={VIDEO_SRC_MP4} type="video/mp4" />
        </video>
        <div className="hero-tint" />
        <div className="hero-vignette" />

        <div className="relative z-10 h-full w-full">
          <div className="grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 h-full pt-28 md:pt-32 pb-16">
            <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col justify-end">
              <div className="max-w-[640px]">
                <div key={`eyebrow-${stepIndex}`} className="cue-state cue-active inline-flex items-center gap-3 mb-6">
                  <span className="font-mono-cap text-white/75 px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)" }}>
                    {cue.eyebrow}
                  </span>
                  <span className="font-mono-cap text-white/40">Automotive · scroll-led</span>
                </div>

                <h1 key={`title-${stepIndex}`} className="cue-state cue-active font-display text-white" style={{ fontSize: "clamp(40px, 6.5vw, 92px)", lineHeight: 0.96, letterSpacing: "-0.025em" }}>
                  {cue.titleLead}
                  <span className="italic-display" style={{ color: "#f4d8c8" }}>{cue.titleAccent}</span>
                  {cue.titleTail}
                </h1>

                <p key={`sub-${stepIndex}`} className="cue-state cue-active mt-6 max-w-[480px] text-white/70" style={{ fontSize: "clamp(15px, 1.05vw, 17px)", lineHeight: 1.55, fontWeight: 400 }}>
                  {cue.sub}
                </p>

                <div className="mt-10 flex items-center gap-2.5">
                  {CUE_POINTS.map((_, i) => (
                    <span key={i} className={`cue-dot ${i === stepIndex ? "is-active" : ""}`} />
                  ))}
                  <span className="ml-3 font-mono-cap text-white/40">
                    {String(stepIndex + 1).padStart(2, "0")} / 0{CUE_POINTS.length}
                  </span>
                </div>
              </div>
            </div>

            <aside className="col-span-12 md:col-span-5 lg:col-span-5 hidden md:flex justify-end">
              <div className="self-end mb-2 w-full max-w-[340px]">
                <div className="rounded-2xl p-5" style={{ background: "rgba(20, 16, 16, 0.55)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(18px)" }}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-cap text-white/55">Knowledge Hub</span>
                    <span className="flex items-center gap-2 font-mono-cap text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#ff8a4a", boxShadow: "0 0 12px #ff8a4a" }} />
                      v2.0 live
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Diagnostics", "Symptom-based repair guides"],
                      ["Installations", "Step-by-step procedures"],
                      ["Recalls", "Live NHTSA safety data"],
                    ].map(([t, s], i) => (
                      <div key={t} className="flex items-start gap-3">
                        <span className="font-mono-cap text-white/35 mt-1">0{i + 1}</span>
                        <div>
                          <div className="text-[14px] text-white">{t}</div>
                          <div className="text-[13px] text-white/55">{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-2 transition-opacity duration-500" style={{ opacity: progress < 0.04 ? 1 : 0 }}>
            <span className="font-mono-cap text-white/55">Scroll · video-led</span>
            <ArrowDown className="h-4 w-4 text-white/55 animate-bounce" />
          </div>

          <div className="hero-progress-track">
            <div className="hero-progress-fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
