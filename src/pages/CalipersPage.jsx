import React from "react";
import TopNav from "../components/site/TopNav";
import Footer from "../components/site/Footer";

export default function CalipersPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Brake Calipers <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Brake Caliper Installation Overview</h3>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Brake calipers are a critical component of the disc brake system, housing the brake pads 
                  and pistons that apply pressure to the brake rotors to slow or stop the vehicle. Proper 
                  caliper installation is essential for brake system performance, safety, and longevity.
                </p>
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  This guide provides comprehensive instructions for replacing brake calipers, covering both 
                  front and rear applications, including special considerations for vehicles with electronic 
                  parking brakes. Following these best practices will help ensure proper brake system function 
                  and prevent issues such as uneven braking, fluid leaks, or premature wear.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                  <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">Important Safety Note:</p>
                  <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">The brake system is a critical safety component. Always follow manufacturer procedures 
                  and take extra precautions during caliper replacement. Improper installation can lead to 
                  brake failure, resulting in property damage, personal injury, or death. If you're unsure 
                  about any aspect of caliper replacement, consult a professional technician.</p>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Vehicle Preparation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for and address any brake-related diagnostic trouble codes and/or warning lights on the instrument panel</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement caliper</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Obtain all vehicle information to ensure correct part application</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Make, year, model, engine, drivetrain configuration (FWD, RWD, 4WD, AWD), brake system details, etc.</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify the replacement caliper is correct for the specific vehicle application</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Confirm whether the vehicle has conventional or electronic parking brakes (for rear calipers)</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Inspect brake pads, brake hardware, brake caliper brackets, and rotors for wear. Replace as necessary. Refer to vehicle service manual</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check brake pad thickness and wear pattern</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect rotor surface for scoring, cracks, or excessive wear</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Examine caliper brackets for damage or corrosion</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Note: After installing new brake calipers, it would be an ideal time to flush the hydraulic brake system. Refer to the vehicle service manual for hydraulic brake system flushing procedure</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Gather all necessary tools and supplies</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake fluid (correct type for vehicle)</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake grease (high-temperature)</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Torque wrench</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake bleeding equipment</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">New copper washers (for banjo bolt connections)</li>
                  </ul></div>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Brake Caliper Installation</h3>
                
                <div className="space-y-4">
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Prepare caliper sliding mechanisms</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Clean caliper bracket and sliding surfaces</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Remove any rust or corrosion from bracket and sliding surfaces</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Lubricate caliper guide-pins (as applicable) with high-temperature brake grease and install in brake caliper bracket with guide-pin boots</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Apply grease only to specific areas recommended by manufacturer</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure boots are properly seated to keep out debris</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Transfer components from old caliper if required</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">For rear calipers with electronic parking brake, transfer motor to new caliper</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Transfer any brackets or special hardware not included with new caliper</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Mount the brake caliper to the brake caliper bracket. If equipped with caliper guide-pins, ensure caliper and caliper guide-pin mating surfaces are flush and correctly positioned</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify proper orientation of caliper (bleeder screw must be at top position)</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure caliper moves freely on slide pins</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Install all caliper mounting hardware and torque to manufacturers specifications</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Use torque wrench set to correct specifications</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify all hardware is properly tightened</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Rear caliper installation: Install the parking brake cable (if applicable). If equipped with electric parking brakes, install the parking brake motor to the brake caliper before the brake caliper is mounted.</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure parking brake cable is properly routed and secured</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify electronic parking brake connections are secure</li>
                  </ul></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Remove cap or plug from brake hose/line</div></div>
                  
                  <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Install the brake caliper hose/line to the caliper. Torque to manufacturers' specifications. Note: If brake caliper hose uses a banjo bolt, replace washers with new ones</div><ul>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Always use new copper washers for banjo bolt connections</li>
                    <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure proper alignment of hose to prevent twisting or kinking</li>
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
