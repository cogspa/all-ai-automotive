// data/part-content.cjs
// Each part gets genuinely differentiated content. The generator pulls from this
// library to produce installation and diagnostic guides that don't all read identically.

module.exports = {
  // ============================================================
  // ENGINE ELECTRICAL
  // ============================================================
  starter: {
    label: "Starter",
    category: "engine-electrical",
    diagnostic: {
      symptoms: [
        "Engine cranks slowly or not at all with a fully charged battery",
        "Single loud click when the key is turned to START",
        "Rapid clicking that follows engine cranking attempts",
        "Freewheeling sound — starter spins but doesn't engage the flywheel",
        "Burning electrical smell or smoke from the starter location",
        "Intermittent no-crank that resolves after the engine cools"
      ],
      causes: [
        "Battery state of charge below 12.4V or failed load test",
        "High resistance / voltage drop in the B+ cable or ground path",
        "Failed solenoid contacts (most common on Honda/Acura)",
        "Worn brushes or commutator inside the starter motor",
        "Damaged flywheel ring gear teeth",
        "Improper shim clearance after a previous repair"
      ],
      tools: [
        { name: "Digital multimeter", required: true },
        { name: "Carbon pile load tester", required: true, note: "For battery load test" },
        { name: "Remote starter switch", required: false },
        { name: "Inspection mirror & flashlight", required: false, note: "For ring gear inspection" }
      ],
      tests: [
        { title: "Battery state of charge", spec: "≥ 12.4V, surface charge removed" },
        { title: "Battery load test", spec: "Holds ≥ 9.6V for 15s at half CCA" },
        { title: "B+ cable voltage drop (cranking)", spec: "≤ 0.5V drop battery → starter post" },
        { title: "Ground voltage drop (cranking)", spec: "≤ 0.2V drop block → battery negative" },
        { title: "Solenoid pull-in voltage", spec: "≥ 8V at the S terminal during crank" }
      ]
    },
    installation: {
      tools: [
        { name: "Metric socket set", required: true, note: "Most starters use 12mm, 14mm, 17mm" },
        { name: "Torque wrench", required: true },
        { name: "Battery terminal puller", required: false },
        { name: "Penetrating oil", required: false, note: "For corroded mounting bolts" }
      ],
      parts: [
        { name: "Replacement starter", quantity: 1 },
        { name: "Battery terminal cleaner / dielectric grease", quantity: 1 },
        { name: "Starter shim kit", quantity: 1, note: "Only if specified by manufacturer" }
      ],
      steps: [
        { title: "Disconnect battery", instruction: "Remove the negative battery cable first. Wait 5 minutes for capacitors to discharge if the vehicle has airbags." },
        { title: "Compare old vs new", instruction: "Lay both starters side by side. Verify pinion gear tooth count, drive direction, mounting bolt pattern, and solenoid terminal positions match.", warning: "A new starter that 'looks different' may still be correct — match function not appearance." },
        { title: "Remove electrical connections", instruction: "Mark and remove the B+ cable (large terminal) and S wire (small terminal). Photograph the routing before disconnecting." },
        { title: "Remove mounting bolts", instruction: "Support the starter as you remove the final bolt — most weigh 8–15 lbs and will fall." },
        { title: "Inspect the flywheel ring gear", instruction: "Rotate the engine by hand and check every tooth visible through the starter opening. Damaged teeth will destroy the new starter within minutes.", spec: "No chipped, rounded, or missing teeth" },
        { title: "Clean the mounting surface", instruction: "Wire-brush the engine block where the starter mounts. The starter grounds through this surface — corrosion here causes slow cranking." },
        { title: "Test-fit the new starter", instruction: "Verify the pinion gear-to-flywheel clearance with a 1/8\" drill bit shank between a flywheel tooth and the pinion. Add or remove shims as needed.", spec: "0.020\" – 0.060\" (1/8\" drill bit shank)" },
        { title: "Install and torque mounting bolts", instruction: "Snug all bolts before final torque. Torque in a cross-pattern if there are 3+ bolts." },
        { title: "Reconnect electrical", instruction: "B+ cable first, then S wire. Apply dielectric grease to terminals. Torque the B+ nut to spec — overtightening cracks the solenoid housing.", spec: "B+ nut: 80–100 in-lb typical" },
        { title: "Reconnect battery and test", instruction: "Negative cable last. Crank the engine — it should start within 2 seconds with no abnormal sound." }
      ],
      torqueSpecs: [
        { fastener: "Starter mounting bolts (8mm)", value: 17, unit: "ft-lb" },
        { fastener: "Starter mounting bolts (10mm)", value: 33, unit: "ft-lb" },
        { fastener: "Starter mounting bolts (12mm)", value: 47, unit: "ft-lb" },
        { fastener: "B+ terminal nut", value: 90, unit: "in-lb" },
        { fastener: "S terminal nut", value: 25, unit: "in-lb" }
      ],
      warnings: [
        "Disconnect the negative battery cable before any work — accidental contact between the B+ cable and ground will weld tools and start fires.",
        "Never strike a modern PMGR (permanent magnet gear reduction) starter with a hammer. The ceramic magnets inside will shatter and the starter will fail within minutes.",
        "Do not crank the engine for more than 15 seconds continuously — starter windings overheat quickly. Wait 2 minutes between attempts."
      ],
      tips: [
        "If the new starter sounds 'different' from the old one, it's normal. PMGR starters spin faster and sound higher-pitched than older direct-drive units.",
        "Save the old starter core — most parts stores charge a $20–50 core deposit that's refunded on return.",
        "On Nissan vehicles, intermittent no-crank is more often the BCM or relay than the starter itself. Test both before condemning the starter."
      ]
    }
  },

  alternator: {
    label: "Alternator",
    category: "engine-electrical",
    diagnostic: {
      symptoms: [
        "Battery warning light illuminated while driving",
        "Headlights dim or flicker, especially at idle",
        "Vehicle dies after running for 20–60 minutes (battery-only operation)",
        "Whining or growling noise that changes pitch with engine RPM",
        "Burning rubber smell (slipping belt) or hot electrical smell",
        "Multiple electrical accessories misbehaving simultaneously"
      ],
      causes: [
        "Worn or slipping serpentine belt",
        "Failed automatic belt tensioner",
        "Worn brushes or slip rings inside the alternator",
        "Failed voltage regulator",
        "Failed diode in the rectifier bridge (causes AC ripple)",
        "Corroded or loose B+ output cable"
      ],
      tools: [
        { name: "Digital multimeter with AC voltage range", required: true, note: "AC ripple test reveals diode failure" },
        { name: "Belt tension gauge", required: false },
        { name: "Carbon pile load tester", required: true }
      ],
      tests: [
        { title: "Resting battery voltage", spec: "12.4–12.7V engine off" },
        { title: "Charging voltage at idle", spec: "13.5–14.7V no load" },
        { title: "Charging voltage under load", spec: "≥ 13.2V with headlights, blower, rear defrost on" },
        { title: "AC ripple at battery", spec: "≤ 50 mV AC — higher indicates failed diode" },
        { title: "B+ cable voltage drop", spec: "≤ 0.3V drop alternator → battery+ at 2000 RPM with load" }
      ]
    },
    installation: {
      tools: [
        { name: "Serpentine belt tool / breaker bar", required: true },
        { name: "Metric socket set", required: true },
        { name: "Torque wrench", required: true }
      ],
      parts: [
        { name: "Replacement alternator", quantity: 1 },
        { name: "Serpentine belt", quantity: 1, note: "Replace if more than 50% of life remaining" },
        { name: "Belt tensioner", quantity: 1, note: "Replace if pulley wobbles or spring is weak" }
      ],
      steps: [
        { title: "Verify the battery is good", instruction: "Charge the battery to 12.6V minimum and load-test it BEFORE installing the alternator. A discharged battery will overload the new alternator and fail it within hours.", warning: "This is the #1 cause of premature replacement-alternator failure. Do not skip." },
        { title: "Disconnect negative battery cable", instruction: "Wait 5 minutes if the vehicle has airbags." },
        { title: "Photograph belt routing", instruction: "Take photos from multiple angles before removing the belt. Routing errors are easy to make and hard to spot." },
        { title: "Release belt tensioner", instruction: "Rotate the automatic tensioner with a breaker bar to release belt tension. Slip the belt off the alternator pulley." },
        { title: "Disconnect electrical", instruction: "Remove the B+ cable nut and the regulator/field plug. Note plug orientation." },
        { title: "Remove mounting bolts", instruction: "Support the alternator as you remove the final bolt." },
        { title: "Inspect the new alternator pulley", instruction: "Confirm pulley type (solid vs OAD/clutch pulley) matches the original. OAD pulleys must be installed using the correct tool — never with an impact gun." },
        { title: "Install new alternator", instruction: "Mount, then snug bolts before final torque. Verify the alternator sits flat against the mounting surface (rust/debris will hold it crooked and cause belt misalignment)." },
        { title: "Reconnect electrical", instruction: "B+ first, then field plug. Torque the B+ nut to spec.", spec: "B+ nut: 80–105 in-lb typical" },
        { title: "Install belt", instruction: "Match your routing photo. Rotate the tensioner, slip belt over the alternator pulley last, release the tensioner slowly." },
        { title: "Verify belt seating", instruction: "Spin each pulley by hand and confirm the belt sits centered in every groove. A misrouted belt will shred within a mile." },
        { title: "Charging system test", instruction: "Reconnect battery, start the engine, and verify charging voltage at the battery.", spec: "13.5–14.7V at idle, no load" }
      ],
      torqueSpecs: [
        { fastener: "Alternator mounting bolts (8mm)", value: 18, unit: "ft-lb" },
        { fastener: "Alternator mounting bolts (10mm)", value: 35, unit: "ft-lb" },
        { fastener: "B+ terminal nut", value: 95, unit: "in-lb" },
        { fastener: "Pulley nut (if removed)", value: 80, unit: "ft-lb", sequence: "Use pulley holding tool — never impact gun on OAD pulleys" }
      ],
      warnings: [
        "Never disconnect the battery while the engine is running to 'test' the alternator. Modern alternators produce voltage spikes that destroy ECUs, BCMs, and infotainment systems.",
        "Always disconnect the negative battery cable before removing the B+ cable from the alternator — arcing will weld the wrench to the chassis.",
        "A weak battery will destroy a new alternator. Always charge and load-test the battery first."
      ],
      tips: [
        "If the dash warning light stays on after install, the field/regulator plug is likely on the wrong way or has a bent pin.",
        "OAD (overrunning alternator decoupler) pulleys make a loud rattle when failed — sounds like a broken belt. Listen with a stethoscope before condemning the alternator.",
        "Always replace the serpentine belt and inspect the tensioner during alternator service. Both wear together."
      ]
    }
  },

  // ============================================================
  // BRAKES
  // ============================================================
  "brake-pad": {
    label: "Brake Pads",
    category: "brakes",
    diagnostic: {
      symptoms: [
        "High-pitched squeal when braking (wear indicator contact)",
        "Grinding metal-on-metal sound (pads worn through to backing plate)",
        "Brake pedal pulsation (warped or thickness-varied rotor)",
        "Vehicle pulls to one side under braking",
        "Brake dust accumulation heavier on one wheel",
        "Increased stopping distance or soft pedal feel"
      ],
      causes: [
        "Normal wear — pad friction material below 3mm",
        "Rotor thickness variation (DTV) causing pedal pulsation",
        "Seized caliper slide pins causing uneven pad wear",
        "Stuck caliper piston dragging one pad",
        "Wrong pad compound for vehicle use case (track pads on a daily driver)",
        "Glazed pads from overheating"
      ],
      tools: [
        { name: "Brake pad thickness gauge or 6\" ruler", required: true },
        { name: "Micrometer", required: false, note: "For rotor thickness measurement" }
      ],
      tests: [
        { title: "Pad friction material thickness", spec: "Replace at 3mm; legal minimum 1.5mm" },
        { title: "Rotor thickness vs discard spec", spec: "Cast into rotor hat — typically 1–2mm above min" },
        { title: "Rotor thickness variation (DTV)", spec: "≤ 0.001\" / 0.025mm at 8 points around rotor" },
        { title: "Rotor lateral runout", spec: "≤ 0.002\" / 0.05mm with dial indicator" }
      ]
    },
    installation: {
      tools: [
        { name: "Caliper piston compressor / C-clamp", required: true, note: "Use a screw-type tool for rear pistons that screw in" },
        { name: "Torque wrench", required: true },
        { name: "Wire brush + hub cleaning disc", required: true },
        { name: "Brake parts cleaner", required: true },
        { name: "Caliper slide pin grease", required: true, note: "High-temp silicone, never petroleum-based" }
      ],
      parts: [
        { name: "Brake pads (axle set)", quantity: 1, note: "Always replace as an axle pair" },
        { name: "Pad hardware / abutment clips", quantity: 1, note: "Never reuse old hardware" },
        { name: "Brake rotors", quantity: 2, note: "Replace if below discard spec or beyond machining" }
      ],
      steps: [
        { title: "Loosen lug nuts", instruction: "Break lug nuts loose with the wheels on the ground before lifting." },
        { title: "Lift and secure the vehicle", instruction: "Use jack stands rated for the vehicle weight on factory lift points. Never work under a vehicle on a jack alone.", warning: "Falls from improperly supported vehicles cause more shop injuries than every other brake hazard combined." },
        { title: "Remove the wheel and inspect", instruction: "Photograph the assembly before disturbing anything. Note pad orientation, wear sensor location, and shim arrangement." },
        { title: "Open the master cylinder reservoir", instruction: "Pushing pistons back will displace fluid. Siphon some out first if the reservoir is full to prevent overflow." },
        { title: "Remove caliper bolts and lift caliper off", instruction: "Hang the caliper from the strut spring with a hook — never let it hang by the brake hose. Hose damage is invisible until it bursts." },
        { title: "Remove old pads and hardware", instruction: "Note shim locations. Discard all old hardware clips." },
        { title: "Inspect and clean caliper bracket", instruction: "Slide pins should move freely with finger pressure. If they're seized, remove the bracket and rebuild or replace." },
        { title: "Compress the caliper piston", instruction: "Front: push straight in with a C-clamp using an old pad as a backing surface. Rear (most): rotate clockwise with a cube tool while pushing in — these are integrated parking brake pistons.", warning: "Rear pistons that are pushed straight in without rotating will damage the parking brake mechanism." },
        { title: "Service the rotor", instruction: "If reusing rotors, wire-brush the hub mounting surface to bare metal. If replacing, wipe the new rotor with brake cleaner to remove the protective oil coating.", spec: "Hub face must be free of all rust and debris — runout starts here." },
        { title: "Install new hardware and pads", instruction: "Install abutment clips first, then pads. Apply a thin film of slide pin grease to pad ears where they contact the bracket — never on friction surfaces." },
        { title: "Lubricate and reinstall slide pins", instruction: "Pins should move with finger pressure after greasing. Boots must seat fully or pins will seize within months." },
        { title: "Reinstall caliper and torque bolts", instruction: "Torque to spec — overtightening cracks bracket ears.", spec: "See torque spec table" },
        { title: "Pump brake pedal until firm", instruction: "Pedal will go to the floor on first 2–3 pumps as pistons re-extend. Do NOT drive the vehicle until the pedal is firm.", warning: "Skipping this step has caused fatal accidents — the first stop attempt will have no brakes." },
        { title: "Check fluid level and torque lug nuts", instruction: "Top off master cylinder with the correct DOT fluid. Torque lugs in a star pattern.", spec: "Lug nuts: see vehicle spec, typically 80–100 ft-lb" },
        { title: "Bed in the brakes", instruction: "Perform 8–10 moderate stops from 40 mph to 10 mph without coming to a complete stop, then drive 5 minutes without braking to cool.", warning: "Skipping bed-in causes pad material transfer in spots, leading to pulsation that feels like warped rotors." }
      ],
      torqueSpecs: [
        { fastener: "Caliper guide pin bolts", value: 26, unit: "ft-lb", sequence: "Verify against vehicle spec — varies 18–35 ft-lb" },
        { fastener: "Caliper bracket bolts", value: 85, unit: "ft-lb" },
        { fastener: "Wheel lug nuts", value: 90, unit: "ft-lb", sequence: "Star pattern, 2 passes" }
      ],
      warnings: [
        "Brake fluid destroys paint on contact — flush spills immediately with water.",
        "Inhaling brake dust is hazardous. Use brake cleaner to wash dust off, never compressed air.",
        "Always replace pads as an axle pair (both fronts or both rears). Mismatched pads cause pulling and uneven wear.",
        "Test brakes in a safe area before normal driving. The first 200 miles are the bed-in period — avoid panic stops."
      ],
      tips: [
        "Marking the rotor position to the hub before removal lets you reinstall in the same orientation, preserving any 'matched' wear pattern.",
        "On vehicles with electronic parking brakes, the rear caliper pistons must be retracted with a scan tool, not manually rotated.",
        "Ceramic pads dust less but heat-cycle slower — fine for daily driving, marginal for towing or mountain descents."
      ]
    }
  },

  "brake-caliper": {
    label: "Brake Caliper",
    category: "brakes",
    diagnostic: {
      symptoms: [
        "Vehicle pulls hard to one side under braking",
        "One wheel hot to the touch after a short drive",
        "Burning brake smell after highway driving",
        "Inboard pad worn dramatically more than outboard pad",
        "Brake fluid weeping from piston dust boot",
        "Brake pedal slowly sinks while held at a stop"
      ],
      causes: [
        "Seized caliper piston (won't retract)",
        "Seized slide pins (caliper can't float)",
        "Internally collapsed brake hose acting as a check valve",
        "Torn piston seal allowing fluid leak",
        "Corroded caliper bore"
      ],
      tools: [
        { name: "Infrared thermometer", required: false, note: "Compare hub temps after a drive" },
        { name: "Flare nut wrench set", required: true, note: "Open-end wrenches will round brake line fittings" }
      ],
      tests: [
        { title: "Hub temperature comparison", spec: "Left and right hubs within 30°F of each other after a drive" },
        { title: "Slide pin freedom", spec: "Pins move with finger pressure when removed" },
        { title: "Piston retraction", spec: "Piston compresses smoothly with even pressure" }
      ]
    },
    installation: {
      tools: [
        { name: "Flare nut wrench (10mm or 11mm typical)", required: true },
        { name: "Brake bleeder kit (vacuum or pressure)", required: true },
        { name: "Caliper hanger hooks", required: true },
        { name: "Catch bottle for old fluid", required: true }
      ],
      parts: [
        { name: "Replacement caliper", quantity: 1 },
        { name: "Copper crush washers", quantity: 2, note: "Never reuse — always new" },
        { name: "Brake fluid", quantity: 1, note: "Match DOT spec on master cylinder cap" },
        { name: "Brake pads", quantity: 1, note: "Replace as a set with caliper service" }
      ],
      steps: [
        { title: "Position the new caliper", instruction: "Before installing, verify the bleeder screw is on the TOP of the caliper when mounted. A bleeder on the bottom means it's the wrong side.", warning: "Air rises — a bleeder at the bottom traps air and you will never get a firm pedal." },
        { title: "Crack the brake line fitting", instruction: "Use a flare nut wrench. If the fitting won't break loose, soak with penetrating oil and try again — never force it." },
        { title: "Remove caliper from bracket", instruction: "Remove guide pin bolts, lift caliper off, then fully unscrew the brake hose banjo bolt or line fitting." },
        { title: "Transfer pads if reusing", instruction: "Most replacement calipers come without pads. Confirm before disposal." },
        { title: "Install new copper washers", instruction: "Place ONE new copper washer on each side of the banjo fitting — never reuse old washers, never use only one." },
        { title: "Connect brake hose to new caliper", instruction: "Hand-thread the banjo bolt fully before torquing. Cross-threading will leak forever." },
        { title: "Mount caliper to bracket", instruction: "Lubricate slide pins with high-temp brake grease. Verify free movement before final torque." },
        { title: "Bleed the brake system", instruction: "Bleed in the correct sequence for your vehicle (typically furthest-from-master to nearest). Use only fresh fluid from a sealed container.", spec: "Continue bleeding until fluid runs clear and bubble-free" },
        { title: "Test pedal feel", instruction: "Pump pedal 5–10 times. Should be firm and high. If spongy or sinks, repeat bleed sequence.", warning: "Soft or sinking pedal means air remains. Do not drive." },
        { title: "Road test", instruction: "Test in a safe area at low speed before normal driving. Confirm no pull and no overheating after 10 minutes." }
      ],
      torqueSpecs: [
        { fastener: "Banjo bolt", value: 25, unit: "ft-lb", sequence: "New copper washers required each install" },
        { fastener: "Caliper guide pin bolts", value: 26, unit: "ft-lb" },
        { fastener: "Caliper bracket-to-knuckle bolts", value: 85, unit: "ft-lb" },
        { fastener: "Bleeder screw", value: 80, unit: "in-lb" }
      ],
      warnings: [
        "Always replace calipers in axle pairs unless one is failed from impact damage. Mismatched calipers cause pulling.",
        "Brake fluid is hygroscopic — moisture in old fluid drops boiling point and corrodes ABS valves. Use only fresh fluid from a sealed container.",
        "Never let the master cylinder run dry during bleeding — air enters the ABS module and requires a scan tool to clear."
      ],
      tips: [
        "Loaded calipers (caliper + pads + hardware preassembled) cost more but eliminate the 'forgot a clip' problem.",
        "On vehicles older than 10 years, the brake hose is often the actual culprit behind 'caliper' pulling. Replace hoses at the same time.",
        "If the new caliper has a threaded plastic plug instead of a metal banjo fitting at the inlet, it's a transport plug — remove before installing the brake line."
      ]
    }
  },

  // ============================================================
  // FUEL & EMISSIONS
  // ============================================================
  "ignition-coil": {
    label: "Ignition Coil",
    category: "engine-electrical",
    diagnostic: {
      symptoms: [
        "Cylinder-specific misfire code (P0301–P0312)",
        "Rough idle that smooths out at higher RPM",
        "Hesitation or stumble under acceleration",
        "Check Engine Light flashing (active misfire — catalyst-damaging)",
        "Reduced fuel economy",
        "Rotten egg smell from exhaust (raw fuel hitting cat)"
      ],
      causes: [
        "Failed coil internal windings (open or shorted)",
        "Cracked coil housing allowing arc-over",
        "Worn spark plugs raising required coil voltage",
        "Carbon-tracked coil boot",
        "Failed ECM coil driver (rare but possible)",
        "Damaged wiring connector or pin"
      ],
      tools: [
        { name: "OBD-II scan tool with live data", required: true, note: "Mode 6 misfire counter is faster than P-codes" },
        { name: "Digital multimeter", required: true },
        { name: "Spark tester", required: false, note: "Lisle 20610 or equivalent" }
      ],
      tests: [
        { title: "Primary winding resistance", spec: "0.4–2.0Ω typical (verify against spec)" },
        { title: "Secondary winding resistance", spec: "5–15kΩ typical (verify against spec)" },
        { title: "Coil swap test", spec: "Move suspect coil to adjacent cylinder; if misfire follows, coil is bad" },
        { title: "Spark plug condition", spec: "Replace plugs at the same time as a coil — old plugs killed the coil" }
      ]
    },
    installation: {
      tools: [
        { name: "10mm socket and short extension", required: true, note: "Most COP coils use 10mm hold-down bolts" },
        { name: "Spark plug socket", required: true, note: "5/8\" or 9/16\" depending on plug" },
        { name: "Torque wrench (in-lb range)", required: true },
        { name: "Dielectric grease", required: true }
      ],
      parts: [
        { name: "Replacement ignition coil", quantity: 1, note: "Replace as a set if mileage is high" },
        { name: "Spark plugs", quantity: 1, note: "Always replace plugs with coils" }
      ],
      steps: [
        { title: "Identify the failed cylinder", instruction: "Use a scan tool to read misfire counts (Mode 6 PIDs). Confirm which cylinder is failing — don't assume from a P-code alone." },
        { title: "Remove engine cover and locate coil", instruction: "Cylinder numbering varies by manufacturer — verify against a service manual diagram before disconnecting anything." },
        { title: "Disconnect electrical connector", instruction: "Press the locking tab fully before pulling. Old connectors crack — handle gently." },
        { title: "Remove hold-down bolt and pull coil", instruction: "Coil should pull straight up. Twist gently if seized to break the boot's grip on the plug." },
        { title: "Inspect the spark plug", instruction: "Pull the plug. Color should be light tan. Black/sooty = rich condition; white/blistered = lean or overheating; oil-fouled = valve seal or ring issue.", spec: "Tan color, gap matches spec ±0.002\"" },
        { title: "Install new spark plug", instruction: "Apply anti-seize to threads (aluminum heads only — never on plated plugs without dry-thread spec).", spec: "Plug torque varies — typically 18–22 ft-lb for 14mm plugs" },
        { title: "Install new coil", instruction: "Apply a small amount of dielectric grease to the inside of the coil boot. Press straight down until fully seated — you'll feel it click onto the plug." },
        { title: "Reinstall hold-down and connector", instruction: "Snug the bolt — these are aluminum threaded into aluminum, easy to strip.", spec: "Coil hold-down: 80–90 in-lb typical" },
        { title: "Clear codes and verify", instruction: "Clear DTCs with the scan tool. Run the engine 5 minutes and recheck misfire counters. New count should be zero." }
      ],
      torqueSpecs: [
        { fastener: "Coil hold-down bolt (M6)", value: 85, unit: "in-lb" },
        { fastener: "Spark plug (14mm, aluminum head)", value: 18, unit: "ft-lb" },
        { fastener: "Spark plug (12mm, modern)", value: 13, unit: "ft-lb" }
      ],
      warnings: [
        "Replace spark plugs every time you replace coils. Worn plugs raise the voltage demand on the new coil and will kill it within months.",
        "Active misfires (flashing CEL) damage the catalytic converter quickly. Don't drive more than necessary with a flashing light.",
        "Never test for spark by pulling a coil while the engine runs — modern coils produce 40,000V+ and will deliver a serious shock."
      ],
      tips: [
        "If multiple coils are failing within months, suspect a charging system over-voltage condition or a leaking valve cover gasket flooding the spark plug wells with oil.",
        "Aftermarket 'OE replacement' coils vary wildly in quality. For European vehicles, OEM is often worth the price difference.",
        "Coil-on-plug systems can mask failed plug wires on older designs that still use them — verify the system layout before parts shopping."
      ]
    }
  },

  "oxygen-sensor": {
    label: "Oxygen Sensor",
    category: "fuel-emissions",
    diagnostic: {
      symptoms: [
        "Check Engine Light with O2 sensor codes (P0130–P0167)",
        "Reduced fuel economy (10–20% drop typical)",
        "Failed emissions test for high HC or low NOx",
        "Hesitation under steady throttle",
        "Catalyst efficiency code (P0420 / P0430) — often the downstream sensor"
      ],
      causes: [
        "Sensor heater circuit failure (heater codes)",
        "Sensor element contamination from oil burning, coolant, or silicone",
        "Aged sensor — typical life 60k–100k miles for unheated, 100k+ for heated",
        "Wiring damage or connector corrosion",
        "Exhaust leak upstream of sensor causing false lean reading"
      ],
      tools: [
        { name: "Oxygen sensor socket", required: true, note: "22mm with wire slot — won't damage the connector" },
        { name: "OBD-II scan tool with live data", required: true },
        { name: "Anti-seize compound (high-temp)", required: true, note: "Many new sensors come pre-coated — check before adding more" }
      ],
      tests: [
        { title: "Upstream sensor switching", spec: "Voltage cycles 0.1V–0.9V, 5–10 times in 10 seconds at 2500 RPM" },
        { title: "Downstream sensor (post-cat)", spec: "Should be relatively flat at ~0.6–0.8V — flat means cat is working" },
        { title: "Heater circuit resistance", spec: "Typically 4–10Ω cold (verify spec)" },
        { title: "Sensor response time", spec: "Lean → rich transition under 100ms on a healthy sensor" }
      ]
    },
    installation: {
      tools: [
        { name: "Oxygen sensor socket (22mm)", required: true },
        { name: "Penetrating oil", required: true, note: "Apply 24h before removal if possible" },
        { name: "Propane torch", required: false, note: "For seized sensors" }
      ],
      parts: [
        { name: "Replacement O2 sensor", quantity: 1, note: "Match exact part number — universal sensors require splicing" }
      ],
      steps: [
        { title: "Let exhaust cool", instruction: "Wait at least 30 minutes after engine shutoff. Hot exhaust causes severe burns and makes seized sensors more likely to break.", warning: "Cold thread pulls clean; hot or warm threads gall and shear." },
        { title: "Soak sensor threads", instruction: "Apply penetrating oil to the sensor base where it threads into the exhaust. Wait 15+ minutes before attempting removal. Repeat if it doesn't free easily." },
        { title: "Disconnect electrical connector", instruction: "Trace the wire from the sensor back to its connector — usually clipped to the body or transmission. Press the lock tab and unplug." },
        { title: "Remove sensor with O2 socket", instruction: "Use the slotted O2 socket so the wire can pass through. Apply steady pressure — if the sensor won't budge, heat the bung with a propane torch for 30 seconds and try again.", warning: "If the sensor breaks off in the bung, you'll need to drill, tap, or replace the manifold. Patience prevents this." },
        { title: "Inspect the bung threads", instruction: "Run a thread chaser (M18 x 1.5 typical) through the bung if threads look damaged or carboned." },
        { title: "Apply anti-seize to new sensor", instruction: "Most new sensors are pre-coated. If not, apply a thin layer to the threads ONLY — never on the sensor element.", warning: "Anti-seize on the sensor element will contaminate it and cause immediate failure." },
        { title: "Thread sensor by hand first", instruction: "Hand-thread until snug to confirm the sensor isn't cross-threading. Cross-threaded sensors will leak and read incorrectly." },
        { title: "Torque to spec", instruction: "Don't overtighten — these threads strip easily and the sensor housing can crack.", spec: "28–37 ft-lb typical" },
        { title: "Reconnect electrical and route wire", instruction: "Keep the wire away from exhaust components. Use the original retaining clips so the wire can't melt against the manifold." },
        { title: "Clear codes and verify", instruction: "Clear DTCs and drive 10–15 minutes through the readiness drive cycle. Verify O2 sensor switching activity in live data." }
      ],
      torqueSpecs: [
        { fastener: "Oxygen sensor (M18 x 1.5)", value: 33, unit: "ft-lb" }
      ],
      warnings: [
        "Never use silicone sealant or RTV anywhere near a new O2 sensor — even fumes will permanently contaminate the sensor element.",
        "Do not touch the sensor tip with bare hands. Skin oils contaminate the element.",
        "If the sensor breaks off in the bung, do not drive the vehicle until repaired — exhaust leaks at this location can pull moisture into the engine on shutdown."
      ],
      tips: [
        "When a downstream O2 throws P0420, the cat is the more likely culprit than the sensor. Test with live data before condemning the cat.",
        "Brand matters more for O2 sensors than most parts. Stick with NTK, Denso, or Bosch — the OEM supplier for most vehicles.",
        "Check for exhaust leaks upstream of the sensor before replacing. A leak causes false lean readings that make the ECU dump fuel."
      ]
    }
  },

  // ============================================================
  // DRIVETRAIN
  // ============================================================
  "wheel-hub": {
    label: "Wheel Hub Assembly",
    category: "drivetrain",
    diagnostic: {
      symptoms: [
        "Humming or growling noise that changes with vehicle speed",
        "Noise pitch changes when turning (loaded vs unloaded bearing)",
        "Wheel wobble or loose feel in steering",
        "ABS warning light (failed integrated speed sensor)",
        "Excessive play when rocking the wheel at 12 and 6 o'clock positions",
        "Uneven tire wear on one corner"
      ],
      causes: [
        "Worn bearing rollers or races",
        "Failed integrated ABS sensor",
        "Bearing damage from impact (curb strike, pothole)",
        "Wheel installed without proper torque, spinning hub on knuckle",
        "Water intrusion past failed seal"
      ],
      tools: [
        { name: "Dial indicator", required: false, note: "Quantifies bearing play" },
        { name: "OBD-II scan tool with ABS data", required: false, note: "Compare wheel speed signals" }
      ],
      tests: [
        { title: "Bearing play", spec: "≤ 0.005\" at the wheel rim with vehicle lifted" },
        { title: "Spin and listen", spec: "Smooth rotation, no grinding or clicking by hand" },
        { title: "ABS sensor signal", spec: "Wheel speed within 2 mph of opposite side at constant speed" }
      ]
    },
    installation: {
      tools: [
        { name: "Heavy-duty breaker bar (1/2\" drive)", required: true, note: "Axle nuts run 150–250 ft-lb" },
        { name: "Axle nut socket", required: true, note: "30mm, 32mm, 35mm, or 36mm typical" },
        { name: "Slide hammer with hub puller adapter", required: false, note: "For seized hubs" },
        { name: "Rust penetrant", required: true }
      ],
      parts: [
        { name: "Wheel hub assembly", quantity: 1 },
        { name: "Axle nut", quantity: 1, note: "Single-use on most modern vehicles — replace, don't reuse" },
        { name: "Anti-seize (light coat)", quantity: 1, note: "On hub-to-knuckle mating surface ONLY" }
      ],
      steps: [
        { title: "Loosen lug nuts and axle nut", instruction: "Break both loose with the wheel on the ground. Axle nuts often require a 4ft cheater bar — never an impact gun on the way off (peens the axle threads)." },
        { title: "Lift, support, remove wheel", instruction: "Jack stands on factory points. Remove the wheel." },
        { title: "Remove brake components", instruction: "Caliper bracket bolts off, hang caliper from spring with a hook. Remove rotor — may need a few hammer taps if rusted to the hub." },
        { title: "Disconnect ABS sensor", instruction: "Most newer hubs have integrated sensors with a single connector. Older designs have a separate sensor bolted into the knuckle — remove with care, broken sensors are expensive." },
        { title: "Remove axle nut completely", instruction: "Discard the old nut — most are single-use crush nuts that won't hold proper torque a second time." },
        { title: "Push axle out of hub", instruction: "Tap the axle stub with a brass drift to push it back through the hub. If it won't move, apply penetrant and tap from the other direction.", warning: "Never strike the axle threads with steel — peens them and the new nut won't thread." },
        { title: "Remove hub bolts from rear of knuckle", instruction: "Usually 4 bolts on the back side. They are often seized — soak with penetrant and use a 6-point socket. Stripped bolt heads here turn a 1-hour job into a full day." },
        { title: "Pull the old hub", instruction: "Hubs corrode to the knuckle. Tap with a dead-blow hammer, use a slide hammer, or thread bolts into the hub face and pry — never strike the hub seal directly." },
        { title: "Clean the knuckle bore", instruction: "Wire-brush the knuckle bore where the hub seats. Remove ALL rust — a dirty bore prevents the new hub from seating flat and causes premature bearing failure.", spec: "Clean to bare metal" },
        { title: "Apply light anti-seize", instruction: "Thin film on the knuckle bore only — keeps the next hub from seizing. Never on the bolt threads (changes torque values)." },
        { title: "Install new hub", instruction: "Push hub squarely into the bore. Start all bolts by hand to avoid cross-threading." },
        { title: "Torque hub bolts in cross-pattern", instruction: "Two passes — half-torque first, then final.", spec: "See vehicle spec — typically 70–90 ft-lb" },
        { title: "Slide axle through hub and install new axle nut", instruction: "Stake new nut if it's the staked-collar type, or torque to spec then install cotter pin if pinned design." },
        { title: "Final axle nut torque", instruction: "Final torque set with vehicle on the ground (suspension loaded). Wrong torque here destroys the bearing.", spec: "150–250 ft-lb typical — must verify vehicle spec" },
        { title: "Reinstall brake components and wheel", instruction: "Caliper bracket, rotor, caliper. Pump brake pedal until firm." },
        { title: "Verify ABS function", instruction: "Clear any DTCs, drive at >15 mph for 30 seconds, confirm no ABS light returns." }
      ],
      torqueSpecs: [
        { fastener: "Hub-to-knuckle bolts", value: 80, unit: "ft-lb", sequence: "Cross-pattern, 2 passes — verify vehicle spec" },
        { fastener: "Axle nut", value: 200, unit: "ft-lb", sequence: "Verify vehicle spec — varies 150–280 ft-lb" },
        { fastener: "Caliper bracket bolts", value: 85, unit: "ft-lb" },
        { fastener: "Wheel lug nuts", value: 90, unit: "ft-lb", sequence: "Star pattern, 2 passes" }
      ],
      warnings: [
        "Never use an impact gun to FINAL-torque the axle nut. Impact-tightening will overshoot and pre-load the bearing, destroying it within thousands of miles.",
        "Single-use axle nuts must be replaced — they're designed to crush against the threads to lock. A reused nut will back off.",
        "Final axle nut torque must be applied with the suspension loaded (vehicle weight on the wheels), not with the wheel hanging."
      ],
      tips: [
        "On vehicles with significant rust (Northeast US, Canada), budget extra time and have a backup plan for stripped hub bolts. Heat-and-extract is sometimes the only option.",
        "If the new hub hums after a few hundred miles, it's almost always a debris contamination during install — disassemble and clean the knuckle bore.",
        "Hub bearing brand matters. SKF, Timken, and MOOG are reliable; bargain-bin hubs often fail within 20k miles."
      ]
    }
  },

  // ============================================================
  // DEFAULT FALLBACK
  // ============================================================
  general: {
    label: "General Procedure",
    category: "general",
    diagnostic: {
      symptoms: [
        "System operating outside expected parameters",
        "Warning indicator illuminated on dashboard",
        "Performance, efficiency, or comfort degradation"
      ],
      causes: [
        "Sensor or actuator out of specification",
        "Wiring or connector fault",
        "Mechanical wear or component failure",
        "Software / calibration issue requiring TSB"
      ],
      tools: [
        { name: "OBD-II scan tool with bidirectional control", required: true },
        { name: "Digital multimeter", required: true },
        { name: "Vehicle service manual", required: true }
      ],
      tests: [
        { title: "Read all module DTCs", spec: "Document every code, not just CEL codes" },
        { title: "Inspect related wiring and connectors", spec: "No corrosion, no chafing, all pins seated" },
        { title: "Check for applicable TSBs", spec: "Search NHTSA TSB database by VIN before parts replacement" }
      ]
    },
    installation: {
      tools: [
        { name: "Vehicle-specific service manual", required: true },
        { name: "Torque wrench", required: true },
        { name: "Standard mechanic's hand tools", required: true }
      ],
      parts: [],
      steps: [
        { title: "Reference the service manual", instruction: "Procedures vary significantly between vehicle platforms. Always reference the factory service manual for your specific vehicle." },
        { title: "Disconnect the battery", instruction: "Negative cable first. Wait 5 minutes for capacitors to discharge before working on electrical components." },
        { title: "Document existing configuration", instruction: "Photograph wiring routing, hose connections, and bracket arrangements before disassembly." },
        { title: "Perform the procedure per service manual", instruction: "Follow the manufacturer sequence exactly — many procedures have steps that are non-obvious but critical." },
        { title: "Verify torque specifications", instruction: "Confirm every fastener torque against the service manual. Generic 'feels tight' values cause comebacks." },
        { title: "Test before declaring complete", instruction: "Verify the original symptom is resolved AND no new issues have been introduced." }
      ],
      torqueSpecs: [],
      warnings: [
        "Wear appropriate PPE — safety glasses minimum, gloves for chemical exposure.",
        "Never work under a vehicle supported only by a jack. Use rated jack stands on factory lift points."
      ],
      tips: [
        "When the symptom doesn't match your diagnosis, the diagnosis is wrong — not the symptom. Re-test before replacing parts.",
        "Always check for TSBs before replacing expensive components. The fix is often a reflash or revised part."
      ]
    }
  }
};
