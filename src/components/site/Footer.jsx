import React from "react";

const COL = [
  {
    title: "Product",
    links: [
      ["Knowledge Hub", "#search"],
      ["Quick Guides", "#guides"],
      ["Recalls", "#recalls"],
      ["TSBs", "#search"],
    ],
  },
  {
    title: "Shop",
    links: [
      ["About", "#about"],
      ["Customers", "#customers"],
      ["Pricing", "#pricing"],
      ["Contact", "mailto:support@allaiautomotive.com"],
    ],
  },
  {
    title: "Follow",
    links: [
      ["LinkedIn", "https://linkedin.com"],
      ["YouTube", "https://youtube.com"],
      ["Twitter / X", "https://x.com"],
      ["Instagram", "https://instagram.com"],
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative grain"
      style={{ background: "#070708" }}
      data-testid="site-footer"
    >
      <div className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-20 md:py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.08)"}}>
        <div className="col-span-12 md:col-span-4">
          <div
            className="font-display text-white"
            style={{
              fontSize: "clamp(34px, 5vw, 72px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            ALL AI AUTOMOTIVE
          </div>
          <p
            className="mt-6 max-w-[320px] text-[14px] font-normal"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            The knowledge base for modern repair shops. Accurate, daily — New York · Detroit.
          </p>
        </div>

        {COL.map((c) => (
          <div key={c.title} className="col-span-6 md:col-span-2 mt-10 md:mt-2">
            <span
              className="font-mono-cap"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {c.title}
            </span>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([k, h]) => (
                <li key={k}>
                  <a
                    href={h}
                    className="text-[14px] hover:text-white"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-12 mt-14 pt-6 flex flex-wrap items-center justify-between gap-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <span
            className="font-mono-cap"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            © ALL AI AUTOMOTIVE — Est. 2024, &nbsp;build 2.0
          </span>
          <span
            className="font-mono-cap"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Automotive data · powered by AI
          </span>
          <a
            href="#top"
            className="font-mono-cap"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
