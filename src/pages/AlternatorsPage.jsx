import React from "react";
import TopNav from "../components/site/TopNav";
import QuickGuideNav from "../components/site/QuickGuideNav";
import Footer from "../components/site/Footer";

export default function AlternatorsPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <QuickGuideNav />
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Alternators <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Alternator Installation Overview</h3>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  Proper installation of an alternator is critical for the electrical system's reliability and 
                  longevity. This guide provides step-by-step instructions for correctly diagnosing alternator 
                  issues and ensuring proper installation of a replacement unit.
                </p>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  The alternator is responsible for charging the battery and powering the vehicle's electrical 
                  systems while the engine is running. A failing alternator can lead to battery drain, electrical 
                  system issues, and eventually vehicle breakdown. Following these best practices will help ensure 
                  a successful installation and prevent premature failure.
                </p>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-blush)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Vehicle Preparation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement part</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Verify that battery state of charge is a minimum of 12.45 volts</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Charge battery as needed</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Perform load test on battery to determine state of health</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Visually inspect battery cables for corrosion</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Perform voltage drop tests on positive/negative cables</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Replace cables as needed</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Check for fluid leaks that may have caused the current failure</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Engine oil, coolant, etc.</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Repair or replace source of the fluid leak</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Obtain all vehicle information to ensure correct part application</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Make, year, model, engine, equipment/option packages, etc.</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Alternator Diagnosis Steps</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Turn the ignition on but do not start the engine and observe the instrument cluster for warning lights</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Battery light illuminated key-on-engine-off (KOEO), does this turn off after the engine is started?</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Unusual noise coming from the alternator?</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Connect scan tool and scan all modules for related diagnostic trouble codes (DTC)</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Follow service information to correct associated DTC</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Retest charging system to determine if fault has been corrected</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Check belt condition, tension, and alignment</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Operate tensioner through full range of travel</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check/replace belt</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Inspect alternator wiring connections for damage and repair as needed</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Proceed if it is determined the alternator has failed and needs replacement</div></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-blush)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Alternator Installation Steps</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Disconnect negative battery cable</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Ensure alternator mounting surface is clean and free from debris, oil, grease, corrosion, etc.</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Transfer any mounting hardware, brackets, braces, spacers, sensors, switches from original alternator to replacement if applicable</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Torque alternator mounting bolts to proper specifications</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Verify connector compatibility</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">If connectors are different from OE, verify wire functions</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Follow included adaptor harness instructions (if applicable)</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Properly torque all mounting bolts & electrical connections</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Follow manufacturer specifications</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check belt alignment and tension</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Alternator Verification</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Verify proper operation of charging system</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Allow engine to reach operating temperature</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Turn on accessories and monitor output in response to measure voltage and amperage output from alternator</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Compare to vehicle service information</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify charging system output voltage (13.5V-14.5V at idle)</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Test at various RPM levels</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for any warning lights or system codes</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Road test vehicle with electrical loads active</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Turn on headlights, HVAC system, radio, etc.</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify stable charging system operation</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify correct function and operation</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        </div>
      
</main>
      <Footer />
    </div>
  );
}
