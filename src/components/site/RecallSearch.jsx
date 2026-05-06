import React, { useState } from "react";
import { AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function RecallSearch() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vinData, setVinData] = useState(null);
  const [recalls, setRecalls] = useState(null);

  const handleDecode = async (e) => {
    e.preventDefault();
    const normalized = vin.trim().toUpperCase();
    if (normalized.length !== 17) {
      setError("VIN must be exactly 17 characters.");
      return;
    }

    setError("");
    setLoading(true);
    setVinData(null);
    setRecalls(null);

    try {
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

      setVinData(decoded);

      if (decoded.Make && decoded.Model && decoded.ModelYear) {
        const recallsRes = await fetch(
          `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(
            decoded.Make
          )}&model=${encodeURIComponent(decoded.Model)}&modelYear=${
            decoded.ModelYear
          }`
        );
        const recallsJson = await recallsRes.json();
        setRecalls(recallsJson?.results || []);
      } else {
        setRecalls([]);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recalls" className="relative pt-24 pb-20 px-5 md:px-10 lg:px-14 border-t" style={{ background: "#060607", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono-cap text-white/50">Safety First</span>
        </div>
        <h2 className="font-display text-[40px] md:text-[64px] leading-none tracking-tight mb-6">
          Official NHTSA <br/><span className="italic-display" style={{ color: "var(--c-blush)" }}>Recall Check.</span>
        </h2>
        <p className="text-[15px] text-white/60 max-w-lg mb-10 leading-relaxed">
          Verify any vehicle against the live National Highway Traffic Safety Administration database. Returns vehicle specs and comprehensive open recall data.
        </p>

        <form onSubmit={handleDecode} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="ENTER 17-CHARACTER VIN"
            maxLength={17}
            className="flex-1 px-6 py-4 rounded-full text-[14px] outline-none focus:ring-1 focus:ring-white/20 transition-all text-white placeholder-white/30"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-full text-[13px] font-mono-cap transition-colors disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-white/90"
            style={{ background: "#fff", color: "#000" }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check VIN"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="font-mono-cap text-white/30 text-[10px] mr-1">Try:</span>
          <button
            type="button"
            onClick={() => setVin("1FTFW1ET5DFC10312")}
            className="font-mono-cap px-2 py-0.5 rounded-full transition-colors hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Sample F-150 VIN
          </button>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-2 text-[14px] text-red-400">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {vinData && (
          <div className="mt-12 p-6 md:p-8 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div>
                <span className="font-mono-cap text-white/40 block mb-2">Vehicle Identified</span>
                <h3 className="font-display text-3xl md:text-4xl text-white">
                  {vinData.ModelYear} {vinData.Make} {vinData.Model}
                </h3>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="font-mono-cap text-white/40 text-[10px] mb-1">Engine</span>
                  <span className="text-[14px] text-white/90">{vinData.EngineCylinders}-cyl {vinData.DisplacementL ? `${vinData.DisplacementL}L` : ""}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono-cap text-white/40 text-[10px] mb-1">Drive</span>
                  <span className="text-[14px] text-white/90">{vinData.DriveType || "—"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono-cap text-white/60">
                  {recalls && recalls.length > 0 ? "Open Recall Campaigns" : "Verification complete"}
                </span>
                <span className="font-mono-cap text-white/40">via NHTSA</span>
              </div>

              {recalls && recalls.length === 0 && (
                <div className="p-6 rounded-2xl flex items-center gap-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-500/10 text-green-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <div className="text-white text-[15px] font-medium">No open recalls found</div>
                    <div className="text-white/50 text-[13px] mt-0.5">The NHTSA database reports no active safety campaigns for this VIN.</div>
                  </div>
                </div>
              )}

              {recalls && recalls.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recalls.map((r, i) => (
                    <div key={i} className="p-5 rounded-2xl flex flex-col" style={{ background: "rgba(220,53,69,0.06)", border: "1px solid rgba(220,53,69,0.15)" }}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="font-mono-cap text-red-400 bg-red-500/10 px-2 py-1 rounded">
                          {r.NHTSACampaignNumber || "Recall"}
                        </span>
                        <span className="font-mono-cap text-white/50 text-right truncate">
                          {(r.Component || "—").split(":")[0]}
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-white/80">
                        {r.Summary || "No summary provided by NHTSA."}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
