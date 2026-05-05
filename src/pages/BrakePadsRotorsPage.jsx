import React from "react";
import TopNav from "../components/site/TopNav";
import Footer from "../components/site/Footer";

export default function BrakePadsRotorsPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Brake Pads & Rotors <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Brake Pads & Rotors Installation Overview</h3>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Proper brake pad and rotor replacement is essential for vehicle safety and optimal braking 
                  performance. This guide provides comprehensive instructions for diagnosing, removing, and 
                  installing brake pads and rotors according to industry best practices.
                </p>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Brake pads and rotors are critical wear items in your vehicle's braking system. The pads provide 
                  the friction surface that presses against the rotors (discs) when the brakes are applied, 
                  converting kinetic energy into heat energy to slow and stop the vehicle.
                </p>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Following these best practices during installation will help ensure proper brake system function, 
                  maximize component life, and prevent issues such as noise, vibration, premature wear, or reduced 
                  braking performance.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                  <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">Important Safety Note:</p>
                  <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">The brake system is a critical safety component. Always follow manufacturer procedures 
                  and take extra precautions during installation. If you're unsure about any aspect of brake 
                  service, consult a professional technician.</p>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Vehicle Preparation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Obtain all vehicle information to ensure correct part application</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Make, year, model, engine, drivetrain configuration (FWD, RWD, 4WD, AWD), brake system details, etc.</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Test drive vehicle to verify customer brake system complaint (if applicable)</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Note any noise, vibration, pulling, or pedal feedback</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Test braking performance under various conditions (light/heavy braking, low/high speeds)</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Raise and safely support vehicle. Refer to vehicle service info for lifting/jacking instructions</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure vehicle is on level ground before lifting</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Use proper jack points and jack stands rated for the vehicle weight</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Remove all 4 wheels and perform a complete brake system inspection</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect underhood brake system components – master cylinder, brake fluid condition</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Complete inspection of the tires, steering, suspension, and driveline components for wear or damage should be performed as problems in these areas can sometimes affect brake performance</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for uneven pad wear, rotor scoring, discoloration, or warping</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect brake fluid level and condition</li>
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
