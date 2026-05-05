import React from "react";
import TopNav from "../components/site/TopNav";
import QuickGuideNav from "../components/site/QuickGuideNav";
import Footer from "../components/site/Footer";

export default function WheelHubsPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <QuickGuideNav />
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Hub Bearing Assemblies <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Hub Bearing Installation Overview</h3>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  Wheel hub bearings are critical components that support the vehicle's weight while allowing 
                  the wheels to rotate freely with minimal friction. They also play an important role in the 
                  proper function of the ABS and traction control systems through integrated wheel speed sensors.
                </p>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  This guide covers the best practices for installing wheel hub bearing assemblies. Modern vehicles 
                  typically use one of two types of wheel bearing assemblies:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <span className="font-semibold">Gen 1 (Press-in):</span> These bearings require special 
                    tools to press the bearing into the steering knuckle and require precise technique to prevent damage.
                  </li>
                  <li>
                    <span className="font-semibold">Gen 2/3 (Bolt-on):</span> These are complete hub assemblies 
                    that bolt directly to the steering knuckle, making installation simpler but still requiring 
                    precise torque specifications.
                  </li>
                </ul>
                <p className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed">
                  Proper installation is essential to ensure safety, prevent premature failure, and maintain 
                  optimal vehicle handling characteristics. Following these best practices will help ensure 
                  successful installation and long service life.
                </p>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-blush)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Vehicle Preparation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement hub bearing</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Obtain all vehicle information to ensure correct part application</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Make, year, model, engine, drivetrain configuration (FWD, RWD, 4WD, AWD), brake system details, etc.</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">A complete inspection of the tires, steering, suspension, brake system, and driveline components for wear or damage should be performed</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for unusual tire wear patterns that may indicate alignment or suspension issues</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Inspect suspension components for wear, damage, or looseness</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Examine brake components for wear or damage</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Make sure to properly raise, support, and secure the vehicle</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Use appropriate lift points specified by the vehicle manufacturer</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Ensure vehicle is stable before proceeding with work</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Check for any wheel speed sensor related fault codes to help with diagnosis and troubleshooting of hub bearing concerns</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Use a scan tool to check for ABS codes related to wheel speed sensors</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Document any codes before beginning work</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-cream-2)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Hub Bearing Installation Steps</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Thoroughly clean the steering knuckle mounting surface of rust and corrosion to ensure proper seating and alignment of new bearing assembly</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Use a wire brush or appropriate tool to clean mounting surfaces</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Ensure all debris is removed for proper fitment</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Clean and inspect drive axle/spindle threads for damage</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for damaged or stripped threads</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Ensure splines are in good condition</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Drive axle nut on some vehicle applications should not be reused and will need to be replaced – check vehicle service information</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Many axle nuts are one-time-use only and must be replaced with new ones</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify replacement nut requirements in service information</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Install new hub bearing assembly</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Carefully align the hub bearing assembly with the mounting holes in the knuckle</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Install mounting bolts finger-tight initially to ensure proper alignment</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Torque hub bearing mounting bolts to OE manufacturer specifications</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Use a torque wrench and follow the proper sequence</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Ensure all fasteners are tightened to the correct specification</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "var(--c-blush)", border: "1px solid rgba(10,10,10,0.07)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-[#0a0a0a]">Final Verification</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Carefully route and secure ABS wheel speed sensor cables and wiring connectors to prevent contact and damage from rotating driveline components</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Ensure wiring is properly clipped into routing guides</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify no wires are stretched, pinched, or able to contact moving parts</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Torque drive axle nut to OE manufacturer specifications</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Use a torque wrench to achieve precise torque setting</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Some axle nuts require a specific tightening procedure or angle tightening</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Install wheel and torque wheel lug nuts to OE manufacturer specifications</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Tighten lug nuts in a star pattern for even pressure</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Use a torque wrench set to the correct specification</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Wheel alignment should be checked after hub bearing replacement</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Hub replacement can affect alignment angles</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify alignment is within specifications after installation</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}><div className="font-display text-[16px] text-[#0a0a0a] mb-2">Road test vehicle – verify correct function and operation</div><ul>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Check for unusual noises during acceleration, deceleration, and cornering</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Verify no ABS or traction control warning lights are illuminated</li>
                    <li className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1">Confirm vehicle tracks straight and handles properly</li>
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
