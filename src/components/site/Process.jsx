import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import OBD_CODES from "../../data/obd2-codes.json";
import { ALL_GUIDES, SYSTEM_DEFAULT_GUIDE } from "../../data/system-routes";

const SEVERITY_STYLES = {
  high:     { bg: "rgba(220,53,69,0.10)",  color: "#a02635",        label: "High" },
  moderate: { bg: "rgba(255,138,74,0.14)", color: "#9a4715",        label: "Moderate" },
  low:      { bg: "rgba(10,10,10,0.06)",   color: "rgba(10,10,10,0.65)", label: "Low" },
};

export default function Process() {
  // Shared state across the four cards.
  const [obdResult, setObdResult] = useState(null);
  const [vinData, setVinData] = useState(null);
  const [recalls, setRecalls] = useState(null);

  return (
    <section
      id="process"
      className="relative"
      style={{ background: "var(--c-cream-2)", color: "var(--c-ink)" }}
    >
      <div
        className="grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-24 md:py-32 border-t"
        style={{ borderColor: "rgba(10,10,10,0.08)" }}
      >
        <div className="col-span-12 md:col-span-4">
          <span
            className="font-mono-cap"
            style={{ color: "rgba(10,10,10,0.55)" }}
          >
            Process · Live diagnostic
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
            className="mt-5 max-w-[420px] text-[14.5px] leading-relaxed font-normal"
            style={{ color: "rgba(10,10,10,0.62)" }}
          >
            Enter a code, decode a VIN, surface the right repair guide,
            then verify open recalls. Powered by the live NHTSA database.
          </p>
          <p
            className="mt-6 text-[14px] font-mono-cap"
            style={{ color: "rgba(10,10,10,0.55)" }}
          >
            Four steps · no signup
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <IdentifyCard onResult={setObdResult} result={obdResult} />
          <DiagnoseCard
            onVinResult={setVinData}
            onRecalls={setRecalls}
            vinData={vinData}
            recalls={recalls}
          />
          <ExecuteCard obdResult={obdResult} />
          <VerifyCard recalls={recalls} vinData={vinData} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 01 — IDENTIFY (OBD-II code lookup against local JSON dataset)        */
/* -------------------------------------------------------------------------- */

function IdentifyCard({ onResult, result }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLookup = (e) => {
    e.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setError("Enter a code (e.g. P0420)");
      return;
    }
    const match = OBD_CODES.find((c) => c.code === normalized);
    if (!match) {
      setError(`No data for ${normalized}. Try P0562, P0615, C0035.`);
      onResult(null);
      return;
    }
    setError("");
    onResult(match);
  };

  const handleExample = (sample) => {
    setCode(sample);
    setError("");
    const match = OBD_CODES.find((c) => c.code === sample);
    if (match) onResult(match);
  };

  return (
    <Card>
      <CardHead n="01" label="step 1 / 4" title="Identify" />
      <p
        className="mt-4 text-[14px] leading-relaxed"
        style={{ color: "rgba(10,10,10,0.62)" }}
      >
        Enter an OBD-II code to see likely causes and the system involved.
      </p>

      <form onSubmit={handleLookup} className="mt-5 flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="P0420, C0035, U0100…"
          maxLength={5}
          className="flex-1 px-4 py-3 rounded-full text-[14px] outline-none focus:ring-2 focus:ring-black/20 transition"
          style={{
            background: "rgba(10,10,10,0.04)",
            border: "1px solid rgba(10,10,10,0.10)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-full text-[12px] font-mono-cap transition-colors hover:bg-black/85"
          style={{ background: "#0a0a0a", color: "#fff" }}
        >
          Look up
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span
          className="font-mono-cap mr-1"
          style={{ color: "rgba(10,10,10,0.45)" }}
        >
          Try:
        </span>
        {["P0562", "P0615", "C0035"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleExample(s)}
            className="font-mono-cap px-2 py-0.5 rounded-full transition-colors hover:bg-black/10"
            style={{
              background: "rgba(10,10,10,0.05)",
              color: "rgba(10,10,10,0.7)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {error && (
        <div
          className="mt-4 flex items-start gap-2 text-[13px]"
          style={{ color: "#a02635" }}
        >
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div
          className="mt-5 rounded-2xl p-4"
          style={{
            background: "rgba(10,10,10,0.04)",
            border: "1px solid rgba(10,10,10,0.06)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-display text-[20px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {result.code}
            </span>
            <SeverityPill severity={result.severity} />
          </div>
          <p
            className="mt-2 text-[13.5px] leading-snug"
            style={{ color: "rgba(10,10,10,0.78)" }}
          >
            {result.title}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span
              className="font-mono-cap mr-1"
              style={{ color: "rgba(10,10,10,0.45)" }}
            >
              {result.system}
            </span>
            {result.components.slice(0, 3).map((c) => (
              <span
                key={c}
                className="font-mono-cap px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(10,10,10,0.06)",
                  color: "rgba(10,10,10,0.7)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 02 — DIAGNOSE (NHTSA vPIC VIN decode + recalls)                      */
/* -------------------------------------------------------------------------- */

function DiagnoseCard({ onVinResult, onRecalls, vinData, recalls }) {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDecode = async (e) => {
    e.preventDefault();
    const normalized = vin.trim().toUpperCase();
    if (normalized.length !== 17) {
      setError("VIN must be exactly 17 characters.");
      return;
    }

    setError("");
    setLoading(true);
    onVinResult(null);
    onRecalls(null);

    try {
      // NHTSA vPIC: VIN decode (free, public, CORS-enabled)
      const vinRes = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${normalized}?format=json`
      );
      const vinJson = await vinRes.json();
      const decoded = vinJson?.Results?.[0];

      if (!decoded || (decoded.ErrorCode && decoded.ErrorCode !== "0")) {
        const errText = decoded?.ErrorText || "Unable to decode VIN.";
        setError(errText.split(";")[0].trim());
        setLoading(false);
        return;
      }

      onVinResult(decoded);

      // NHTSA recalls by vehicle (free, public)
      if (decoded.Make && decoded.Model && decoded.ModelYear) {
        const recallsRes = await fetch(
          `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(
            decoded.Make
          )}&model=${encodeURIComponent(decoded.Model)}&modelYear=${
            decoded.ModelYear
          }`
        );
        const recallsJson = await recallsRes.json();
        onRecalls(recallsJson?.results || []);
      } else {
        onRecalls([]);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card id="recalls">
      <CardHead n="02" label="step 2 / 4" title="Diagnose" />
      <p
        className="mt-4 text-[14px] leading-relaxed"
        style={{ color: "rgba(10,10,10,0.62)" }}
      >
        Decode any VIN against NHTSA's live database. Returns vehicle specs and
        open recalls.
      </p>

      <form onSubmit={handleDecode} className="mt-5 flex gap-2">
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="17-character VIN"
          maxLength={17}
          className="flex-1 px-4 py-3 rounded-full text-[14px] outline-none focus:ring-2 focus:ring-black/20 transition"
          style={{
            background: "rgba(10,10,10,0.04)",
            border: "1px solid rgba(10,10,10,0.10)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-full text-[12px] font-mono-cap transition-colors hover:bg-black/85 disabled:opacity-50 flex items-center justify-center min-w-[80px]"
          style={{ background: "#0a0a0a", color: "#fff" }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Decode"}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span
          className="font-mono-cap mr-1"
          style={{ color: "rgba(10,10,10,0.45)" }}
        >
          Try:
        </span>
        <button
          type="button"
          onClick={() => setVin("1FTFW1ET5DFC10312")}
          className="font-mono-cap px-2 py-0.5 rounded-full transition-colors hover:bg-black/10"
          style={{
            background: "rgba(10,10,10,0.05)",
            color: "rgba(10,10,10,0.7)",
          }}
        >
          Sample F-150 VIN
        </button>
      </div>

      {error && (
        <div
          className="mt-4 flex items-start gap-2 text-[13px]"
          style={{ color: "#a02635" }}
        >
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {vinData && (
        <div
          className="mt-5 rounded-2xl p-4"
          style={{
            background: "rgba(10,10,10,0.04)",
            border: "1px solid rgba(10,10,10,0.06)",
          }}
        >
          <div
            className="font-display text-[20px]"
            style={{ letterSpacing: "-0.01em" }}
          >
            {vinData.ModelYear} {vinData.Make} {vinData.Model}
          </div>
          <div
            className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]"
            style={{ color: "rgba(10,10,10,0.78)" }}
          >
            {vinData.EngineCylinders && (
              <Spec
                k="Engine"
                v={`${vinData.EngineCylinders}-cyl${
                  vinData.DisplacementL ? `, ${vinData.DisplacementL}L` : ""
                }`}
              />
            )}
            {vinData.DriveType && <Spec k="Drivetrain" v={vinData.DriveType} />}
            {vinData.BodyClass && <Spec k="Body" v={vinData.BodyClass} />}
            {vinData.PlantCountry && (
              <Spec k="Plant" v={vinData.PlantCountry} />
            )}
          </div>
          {recalls && (
            <div
              className="mt-3 pt-3 border-t flex items-center justify-between"
              style={{ borderColor: "rgba(10,10,10,0.08)" }}
            >
              <span
                className="font-mono-cap"
                style={{
                  color: recalls.length > 0 ? "#a02635" : "rgba(10,10,10,0.55)",
                }}
              >
                {recalls.length > 0
                  ? `${recalls.length} open recall${
                      recalls.length === 1 ? "" : "s"
                    }`
                  : "No open recalls"}
              </span>
              <span
                className="font-mono-cap"
                style={{ color: "rgba(10,10,10,0.4)" }}
              >
                via NHTSA
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function Spec({ k, v }) {
  return (
    <div className="flex flex-col">
      <span
        className="font-mono-cap"
        style={{
          color: "rgba(10,10,10,0.45)",
          fontSize: "10px",
        }}
      >
        {k}
      </span>
      <span className="text-[13px]">{v}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 03 — EXECUTE (route to existing Quick Guides based on code)          */
/* -------------------------------------------------------------------------- */

function ExecuteCard({ obdResult }) {
  // First try the explicit `guide` field on the code; fall back to the
  // system-default mapping if the code matches a known system.
  const targetPath =
    obdResult?.guide ||
    (obdResult?.system ? SYSTEM_DEFAULT_GUIDE[obdResult.system] : null);

  const matchingGuide = targetPath
    ? ALL_GUIDES.find((g) => g.path === targetPath)
    : null;

  return (
    <Card>
      <CardHead n="03" label="step 3 / 4" title="Execute" />
      <p
        className="mt-4 text-[14px] leading-relaxed"
        style={{ color: "rgba(10,10,10,0.62)" }}
      >
        {matchingGuide
          ? "Recommended guide for this code. Step-by-step torque specs, tools, and OE procedures."
          : "Run a code in step 1 to surface the matching repair guide. Or browse all guides below."}
      </p>

      {matchingGuide ? (
        <Link
          to={matchingGuide.path}
          className="mt-5 block rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md group"
          style={{
            background: "var(--c-cream)",
            border: "1px solid rgba(10,10,10,0.10)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span
                className="font-mono-cap"
                style={{ color: "rgba(10,10,10,0.5)" }}
              >
                Recommended
              </span>
              <div
                className="mt-2 font-display text-[22px]"
                style={{ letterSpacing: "-0.01em" }}
              >
                {matchingGuide.label}
              </div>
              <p
                className="mt-2 text-[13px]"
                style={{ color: "rgba(10,10,10,0.6)" }}
              >
                For {obdResult.code} · {obdResult.system}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ) : (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {ALL_GUIDES.map((g) => (
            <Link
              key={g.path}
              to={g.path}
              className="px-3 py-1.5 rounded-full text-[12.5px] transition-colors hover:bg-black/10"
              style={{
                background: "rgba(10,10,10,0.06)",
                color: "rgba(10,10,10,0.78)",
              }}
            >
              {g.label}
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  CARD 04 — VERIFY (NHTSA recalls list + post-repair checklist)             */
/* -------------------------------------------------------------------------- */

function VerifyCard({ recalls, vinData }) {
  const hasRecalls = recalls && recalls.length > 0;

  return (
    <Card>
      <CardHead n="04" label="step 4 / 4" title="Verify" />
      <p
        className="mt-4 text-[14px] leading-relaxed"
        style={{ color: "rgba(10,10,10,0.62)" }}
      >
        After the repair, clear codes and check for any open NHTSA recall
        campaigns on the vehicle.
      </p>

      {hasRecalls ? (
        <div className="mt-5 space-y-2 max-h-[260px] overflow-y-auto pr-1">
          {recalls.slice(0, 4).map((r, i) => (
            <div
              key={r.NHTSACampaignNumber || i}
              className="rounded-xl p-3"
              style={{
                background: "rgba(220,53,69,0.06)",
                border: "1px solid rgba(220,53,69,0.15)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="font-mono-cap"
                  style={{ color: "#a02635" }}
                >
                  {r.NHTSACampaignNumber || "Recall"}
                </span>
                <span
                  className="font-mono-cap truncate"
                  style={{ color: "rgba(10,10,10,0.5)", maxWidth: "60%" }}
                >
                  {(r.Component || "—").split(":")[0]}
                </span>
              </div>
              <p
                className="mt-1.5 text-[12.5px] leading-snug"
                style={{ color: "rgba(10,10,10,0.72)" }}
              >
                {(r.Summary || "").slice(0, 140)}
                {r.Summary && r.Summary.length > 140 ? "…" : ""}
              </p>
            </div>
          ))}
          {recalls.length > 4 && (
            <p
              className="text-[12px] text-center pt-1"
              style={{ color: "rgba(10,10,10,0.5)" }}
            >
              + {recalls.length - 4} more recall
              {recalls.length - 4 === 1 ? "" : "s"}
            </p>
          )}
        </div>
      ) : (
        <div
          className="mt-5 rounded-2xl p-4"
          style={{
            background: "rgba(10,10,10,0.04)",
            border: "1px solid rgba(10,10,10,0.06)",
          }}
        >
          <span
            className="font-mono-cap"
            style={{ color: "rgba(10,10,10,0.5)" }}
          >
            Verification checklist
          </span>
          <ul className="mt-3 space-y-2">
            {[
              "Reconnect battery & verify no DTCs",
              "Test drive across speed range",
              "Confirm no warning lights illuminated",
              "Run final scan to clear pending codes",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13.5px]"
                style={{ color: "rgba(10,10,10,0.72)" }}
              >
                <CheckCircle2
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: "rgba(10,10,10,0.4)" }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {vinData && recalls && recalls.length === 0 && (
            <p
              className="mt-3 text-[12px]"
              style={{ color: "rgba(10,10,10,0.55)" }}
            >
              ✓ NHTSA reports no open recalls for this vehicle.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared building blocks                                                    */
/* -------------------------------------------------------------------------- */

function Card({ id, children }) {
  return (
    <article
      id={id}
      className="rounded-3xl p-7 md:p-8"
      style={{
        background: "var(--c-cream)",
        border: "1px solid rgba(10,10,10,0.07)",
      }}
    >
      {children}
    </article>
  );
}

function CardHead({ n, label, title }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span
          className="font-display text-[34px] md:text-[42px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {n}
        </span>
        <span
          className="font-mono-cap"
          style={{ color: "rgba(10,10,10,0.55)" }}
        >
          {label}
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
        {title}
      </h3>
    </>
  );
}

function SeverityPill({ severity }) {
  const s = SEVERITY_STYLES[severity] || SEVERITY_STYLES.low;
  return (
    <span
      className="font-mono-cap px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}
