import React, { useState } from "react";
import TopNav from "../components/site/TopNav";
import Footer from "../components/site/Footer";

export default function BoostersPage() {
  const [boosterType, setBoosterType] = useState("vacuum");
  const handleBoosterTypeChange = setBoosterType;
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            Brake Boosters <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">


        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <h3 className="font-display text-[24px] mb-4 text-white">Brake Booster Overview</h3>
                
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Brake boosters are essential components in modern vehicle braking systems, multiplying the force 
                  applied to the brake pedal to reduce the effort required for effective braking. There are two main 
                  types of brake boosters: vacuum boosters and hydro-boosters.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-transparent">
                    <h4 className="font-medium text-lg mb-2">Vacuum Boosters</h4>
                    <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                      Vacuum boosters use engine vacuum (or a vacuum pump in some applications) to create a pressure 
                      differential that multiplies braking force. These are the most common type found in cars and 
                      light-duty trucks.
                    </p>
                  </div>
                  
                  <div className="bg-transparent">
                    <h4 className="font-medium text-lg mb-2">Hydro-Boosters</h4>
                    <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                      Hydro-boosters use hydraulic pressure from the power steering system to multiply braking force. 
                      These are typically found in larger vehicles, diesel applications, or where high vacuum 
                      is not readily available.
                    </p>
                  </div>
                </div>
                
                <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">
                  Proper installation of a brake booster is critical for brake system performance and safety. 
                  This guide covers best practices for installing both vacuum boosters and hydro-boosters, 
                  including preparation, installation steps, and verification procedures.
                </p>
                
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                  <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">Important Safety Note:</p>
                  <p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">The brake system is a critical safety component. Always follow manufacturer procedures 
                  and take extra precautions during booster replacement. Improper installation can lead to 
                  reduced braking performance or brake failure. If you're unsure about any aspect of brake 
                  booster replacement, consult a professional technician.</p>
                </div>
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleBoosterTypeChange("vacuum")}
                    className={`px-4 py-2 rounded ${
                      boosterType === "vacuum"
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Vacuum Boosters
                  </button>
                  <button
                    onClick={() => handleBoosterTypeChange("hydro")}
                    className={`px-4 py-2 rounded ${
                      boosterType === "hydro"
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Hydro-Boosters
                  </button>
                </div>
                
                {boosterType === "vacuum" ? (
                  <div>
                    <h3 className="font-display text-[24px] mb-4 text-white">Vacuum Booster Preparation</h3>
                    
                    <div className="space-y-4">
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement vacuum booster</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify proper vacuum supply to brake booster with a vacuum gauge</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect vacuum supply hose for cracks, deterioration, or collapsed sections</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check vacuum check valve function and orientation</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Measure engine vacuum at idle to ensure adequate vacuum is available</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Check for evidence of brake fluid leakage at mating surface of master cylinder and brake booster</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">If master cylinder rear seal is leaking brake fluid, the master cylinder will require replacement as well</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect master cylinder mounting surface for damage or corrosion</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Obtain all vehicle info to ensure correct part application</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Make, year, model, engine, brake system details, etc.</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify replacement booster matches original in size, mounting configuration, and pushrod length</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Gather necessary tools and parts</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Master cylinder gasket (if applicable)</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Pushrod measurement tool</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Vacuum gauge</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Torque wrench</li>
                      </ul></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-display text-[24px] mb-4 text-white">Hydro-Booster Preparation</h3>
                    
                    <div className="space-y-4">
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Refer to vehicle service information for any special testing, removal, or installation procedures</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for any related technical service bulletins</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to any warning tags or technical bulletins included in the box with the replacement hydroboost assembly</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Obtain all vehicle information to ensure correct part application</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Make, year, model, engine, brake system details, etc.</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify replacement hydroboost matches original in configuration and connection points</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Inspect and correct any problems with the power steering system</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect the power steering pump drive belt for wear, damage, and proper tension</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Replace any leaking or damaged power steering hoses</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Using a power steering pressure gauge verify correct power steering pump pressures</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check power steering fluid condition and level</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Gather necessary tools and parts</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Power steering fluid (correct type for vehicle)</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">New O-rings and seals</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Fluid catch pan</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Torque wrench</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Power steering pressure gauge</li>
                      </ul></div>
                    </div>
                  </div>
                )}
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleBoosterTypeChange("vacuum")}
                    className={`px-4 py-2 rounded ${
                      boosterType === "vacuum"
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Vacuum Boosters
                  </button>
                  <button
                    onClick={() => handleBoosterTypeChange("hydro")}
                    className={`px-4 py-2 rounded ${
                      boosterType === "hydro"
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Hydro-Boosters
                  </button>
                </div>
                
                {boosterType === "vacuum" ? (
                  <div>
                    <h3 className="font-display text-[24px] mb-4 text-white">Vacuum Booster Installation</h3>
                    
                    <div className="space-y-4">
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Remove master cylinder from brake booster</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Disconnect brake lines from master cylinder and cap to prevent fluid loss and contamination</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Remove master cylinder mounting nuts and carefully remove cylinder from booster</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Disconnect vacuum supply hose from booster</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Carefully remove vacuum hose to avoid damaging the check valve</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect check valve for proper function - should allow vacuum only in one direction</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Remove booster from firewall</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Disconnect brake pedal pushrod from inside vehicle (may require dashboard or underdash component removal)</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Remove mounting nuts securing booster to firewall</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Carefully remove booster from vehicle</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Transfer any mounting hardware, brackets, braces, spacers, sensors, switches from original booster to replacement booster if applicable</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure all transferred components are in good condition</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Replace any damaged or worn components</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify correct pushrod adjustments – brake pedal pushrod and master cylinder push rod</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to vehicle service information</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Compare pushrod length to the original unit</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Adjust as needed to match original specifications</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Install new booster</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Carefully position booster against firewall, aligning pushrod with brake pedal connection</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Install and tighten mounting nuts to specified torque</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Connect brake pedal to pushrod inside vehicle</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Install master cylinder</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Use new gasket between master cylinder and booster</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Install master cylinder mounting nuts and torque to specification</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Reconnect brake lines and torque to specification</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Connect vacuum supply</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Install vacuum check valve in correct orientation if removed</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Connect vacuum hose to booster check valve</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Secure with appropriate clamp if needed</li>
                      </ul></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-display text-[24px] mb-4 text-white">Hydro-Booster Installation</h3>
                    
                    <div className="space-y-4">
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Remove master cylinder from hydroboost</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Disconnect brake lines from master cylinder and cap to prevent fluid loss</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Remove master cylinder mounting nuts and carefully remove cylinder</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Disconnect power steering lines from hydroboost</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Place drain pan under connections to catch fluid</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Mark pressure and return lines for proper reconnection</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Disconnect and cap lines to prevent contamination</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Remove hydroboost from firewall</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Disconnect brake pedal from pushrod (may require interior access)</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Remove mounting nuts from firewall</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Carefully remove hydroboost unit</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Transfer any mounting hardware, brackets, braces, spacers, sensors, switches from the original hydroboost unit to the replacement booster if applicable</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure all components are clean and in good condition</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Replace any damaged components</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify correct pushrod adjustments – brake pedal pushrod and master cylinder pushrod</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to vehicle service information</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Compare pushrod length to the original unit</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Adjust as needed to match original specifications</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Install new hydroboost unit</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Position against firewall and align with mounting holes</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Install mounting nuts and torque to specification</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Connect brake pedal to pushrod</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Replace all seals, gaskets, and O-rings during installation to avoid leaks</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Use new O-rings at all hydraulic connections</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">All threaded power steering lines should be carefully started by hand before final tightening to prevent cross-threading and damage to the lines and/or the hydroboost assembly</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Torque all fittings to specification</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Install master cylinder to hydroboost</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Use new gasket if applicable</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Torque mounting nuts to specification</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Reconnect brake lines</li>
                      </ul></div>
                    </div>
                  </div>
                )}
        </div>
        </div>
      

        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="mb-8">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleBoosterTypeChange("vacuum")}
                    className={`px-4 py-2 rounded ${
                      boosterType === "vacuum"
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Vacuum Boosters
                  </button>
                  <button
                    onClick={() => handleBoosterTypeChange("hydro")}
                    className={`px-4 py-2 rounded ${
                      boosterType === "hydro"
                        ? "bg-[#dc3545] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Hydro-Boosters
                  </button>
                </div>
                
                {boosterType === "vacuum" ? (
                  <div>
                    <h3 className="font-display text-[24px] mb-4 text-white">Vacuum Booster Verification</h3>
                    
                    <div className="space-y-4">
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Bleed brake system</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Fill master cylinder with appropriate brake fluid</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Bleed brake system following manufacturer procedures</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for proper pedal feel and height</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Check for leaks</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect all brake line connections</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check master cylinder mounting surface for fluid seepage</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Ensure vacuum connections are secure</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify proper operation of brake lights</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake light switch may require adjustment after booster replacement</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake pedal position sensor may require calibration or relearn procedure after booster replacement</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Test brake lights in all conditions (running, braking, emergency)</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify power assist operation</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">With engine off, pump brake pedal until firm</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Hold pressure on pedal, start engine - pedal should drop slightly as vacuum assist engages</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify proper pedal feel and boost operation</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Road test vehicle – verify correct function and operation</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for proper brake function at various speeds</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify no warning lights are illuminated</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Confirm normal pedal travel and feel</li>
                      </ul></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-display text-[24px] mb-4 text-white">Hydro-Booster Verification</h3>
                    
                    <div className="space-y-4">
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Flush and bleed power steering system</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">The power steering system should be flushed to remove any dirt, debris, or deteriorated power steering fluid during hydroboost installation</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Refer to the vehicle service information for the correct power steering fluid type for the vehicle</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">The power steering filter should be replaced (if applicable)</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Bleed the power steering system to remove air</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Bleed brake system</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Fill master cylinder with appropriate brake fluid</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Bleed brake system following manufacturer procedures</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for proper pedal feel and height</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Check for leaks</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Inspect all brake line connections</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check all power steering connections at hydroboost</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Run engine and verify no fluid leaks at connections</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify proper operation of brake lights</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake light switch may require adjustment after hydroboost replacement</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Brake pedal position sensor may require calibration or relearn procedure after hydroboost replacement</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Test brake lights in all conditions</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Verify power assist operation</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">With engine off, pump brake pedal until firm</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Start engine and check for power assist</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify reserve system function (if equipped) by applying brakes with engine off</li>
                      </ul></div>
                      
                      <div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">Road test vehicle – verify correct function and operation</div><ul>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Check for proper brake function at various speeds</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Verify smooth power steering operation</li>
                        <li className="text-[14px] text-white/60 ml-4 list-disc mb-1">Confirm no unusual noises from power steering pump or hydroboost</li>
                      </ul></div>
                    </div>
                  </div>
                )}
        </div>
        </div>
      

        </div>
      
</main>
      <Footer />
    </div>
  );
}
