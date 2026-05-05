import React from "react";
import TopNav from "../components/site/TopNav";
import QuickGuideNav from "../components/site/QuickGuideNav";
import Footer from "../components/site/Footer";

export default function MasterCylindersPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <QuickGuideNav />
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Master Cylinders <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Master Cylinder Installation Overview</h3>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  The master cylinder is the heart of the hydraulic brake system, converting mechanical force 
                  from the brake pedal into hydraulic pressure that activates the vehicle's brakes. Proper installation 
                  is critical for brake system performance and safety.
                </p>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  This guide provides comprehensive instructions for master cylinder replacement, including 
                  preparation, bench bleeding procedures, installation, and system testing. Following these 
                  best practices will help ensure proper brake system operation and prevent issues such as 
                  soft brake pedal, reduced braking performance, or brake system failure.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                  <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">Important Safety Note:</p>
                  <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">The brake system is a critical safety component. Always follow manufacturer procedures 
                  and take extra precautions during installation to ensure proper function. If you're unsure 
                  about any aspect of installation, consult a professional technician.</p>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-blush)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Vehicle Preparation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement master cylinder</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Obtain all vehicle information to ensure correct part application</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Make, year, model, engine, drivetrain configuration (FWD, RWD, 4WD, AWD), brake system details, transmission type, etc.</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">A complete inspection of the tires, steering, suspension, and brake system components for wear or damage should be performed</div></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Installation Steps</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">After bench bleeding the master cylinder, mount it on the vehicle using a new gasket/seal (if applicable), and torque mounting fasteners to the vehicle manufacturer's specifications</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Carefully start by hand-tightening all threaded brake line connections to avoid cross-threading and damage to replacement master cylinder or brake lines. Torque brake line connections to the vehicle manufacturer specifications</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Fill master cylinder fluid reservoir to the proper level. Pump the brake pedal 3 – 4 times. Apply and hold brake pedal pressure while checking master cylinder brake line connections for leaks</div></div>
                </div>
        </div>
        </div>
      

        </div>
      
</main>
      <Footer />
    </div>
  );
}
