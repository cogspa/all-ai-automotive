import React from "react";
import TopNav from "../components/site/TopNav";
import Footer from "../components/site/Footer";

export default function StartersPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Starters <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Starter Installation Overview</h3>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Proper installation of a starter motor is crucial for reliable vehicle starting and 
                  prevention of premature failures. This guide provides step-by-step instructions for 
                  correctly diagnosing starter issues and ensuring proper installation of a replacement unit.
                </p>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  The starter motor is responsible for cranking the engine during the starting process. 
                  A failing starter can cause no-start conditions, intermittent starting, or unusual noises 
                  during cranking. Following these best practices will help ensure a successful installation 
                  and prevent early component failure.
                </p>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Vehicle Preparation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement part</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify that battery state of charge is a minimum of 12.45 volts</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Charge battery as needed</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Perform load test on battery to determine state of health</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Visually inspect battery cables for corrosion</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Perform voltage drop tests on positive/negative cables</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Replace cables as needed</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Check for fluid leaks that may have caused the current failure</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Engine oil, coolant, etc.</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Repair or replace source of the fluid leak</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Starter Diagnosis Steps</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Turn the ignition on but do not start the engine and observe the instrument cluster for warning lights</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Are there any anti-theft, security lights or messages displayed?</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Connect scan tool and scan all modules for related diagnostic trouble codes (DTC)</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Follow service information to correct associated DTC</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Proceed if it is determined that the starter has failed and needs replacement</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Obtain all vehicle info to ensure correct part application</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Make, year, model, engine, equipment/option packages, etc.</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Evaluate the vehicle's starting system</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Battery condition and state of charge</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Battery cables and connections</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for corroded battery terminals</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect starter relay and ignition switch function</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Starter Installation Steps</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Disconnect negative battery cable</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Disconnect all cables from starter before unbolting starter from vehicle</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Do not allow starter to hang from any attached cables</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Inspect the old starter for broken/cracked nose housing, milled pinion, and mounting hole irregularities, and repair the source of the problem</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Backfire on startup, broken or missing teeth on the flywheel and worn-out mounting bolts/hardware</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Ensure starter mounting surface is clean and free from debris, oil, grease, corrosion, paint, etc.</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Transfer any mounting hardware, brackets, braces, spacers, sensors, switches, heat shields from original starter to replacement if applicable</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Ensure starter is fully seated before tightening mounting bolts</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Torque starter mounting bolts to proper specifications</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Compare replacement starter to original unit</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify same mounting configuration</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check pinion gear engagement and rotation</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure electrical connector compatibility</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Inspect flywheel/flexplate ring gear for damage</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Look for worn or broken teeth</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for proper alignment</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Properly torque all mounting bolts & electrical connections</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Follow manufacturer specifications</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure proper routing of wires to avoid heat damage</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Starter Verification</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">After installation, test cranking performance</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Reconnect battery</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for proper engagement with ring gear</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify starter draws correct amperage</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify proper operation of starting system</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Turn key to crank position and listen for unusual noise</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Road test vehicle – verify correct function and operation</div></div>
                </div>
        </div>
        </div>
      

        </div>
      
</main>
      <Footer />
    </div>
  );
}
