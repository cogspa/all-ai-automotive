const fs = require('fs');
const path = require('path');

const indexData = JSON.parse(fs.readFileSync('public/searchIndex.json', 'utf8'));

const outputDir = 'public/html_bulletins';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Comprehensive Expert Knowledge Base
const expertData = {
    "starter": {
        symptoms: [
            "Engine cranks very slowly or not at all.",
            "Single loud click or rapid clicking when key is turned.",
            "Freewheeling sound (starter spins but does not engage flywheel).",
            "Smoke or burning electrical smell from the starter motor."
        ],
        tools: [
            "Digital Multimeter (DMM)",
            "Remote Starter Switch",
            "Wire Brushes and Terminal Cleaners",
            "Torque Wrench",
            "Starter Shims (if applicable to vehicle)"
        ],
        steps: [
            "Verify the battery is fully charged (minimum 12.4V) and passes a load test.",
            "Inspect and clean battery terminals, ensuring tight connections.",
            "Perform a voltage drop test on the starter main cable and solenoid wire (should not exceed 0.5V drop).",
            "Check for engine mechanical binding by rotating the crankshaft manually with a breaker bar.",
            "If replacing the starter, compare the pinion gear depth and tooth count with the original unit.",
            "Check flywheel ring gear for damaged or missing teeth through the inspection cover.",
            "Ensure starter mounting surface is clean to provide a solid electrical ground."
        ],
        warnings: [
            "ALWAYS disconnect the negative battery cable before servicing the starter to prevent accidental shorts or engine cranking.",
            "Never tap the starter motor with a hammer. Modern permanent magnet gear reduction (PMGR) starters contain brittle ceramic magnets that will shatter."
        ]
    },
    "alternator": {
        symptoms: [
            "Battery warning light illuminated on dashboard.",
            "Dimming or flickering headlights, especially at idle.",
            "Vehicle stalls while driving or accessories lose power.",
            "Whining or growling noise from the engine accessory drive."
        ],
        tools: [
            "Digital Multimeter (DMM)",
            "Carbon Pile Load Tester",
            "Belt Tension Gauge",
            "Stethoscope (for bearing noise)"
        ],
        steps: [
            "Verify the battery is fully charged. A severely discharged battery will overwork and immediately destroy a new alternator.",
            "Inspect the serpentine belt for glazing, cracking, or fluid contamination.",
            "Check the automatic belt tensioner. A weak tensioner will cause belt slip under load.",
            "Perform a charging system test. Output should generally be between 13.5V and 14.5V with the engine running.",
            "Perform a voltage drop test on the B+ cable from the alternator to the battery positive terminal.",
            "Verify the alternator housing has a clean, rust-free mounting surface to ensure a proper ground."
        ],
        warnings: [
            "NEVER test an alternator by disconnecting the battery while the engine is running. This creates a high-voltage spike that destroys vehicle modules.",
            "Always disconnect the battery before removing the B+ wire from the alternator to prevent arcing."
        ]
    },
    "brakepads": {
        symptoms: [
            "Squealing, grinding, or scraping noises when braking.",
            "Brake pedal pulsation or steering wheel vibration.",
            "Vehicle pulling to one side during braking.",
            "Increased stopping distance or poor brake bite."
        ],
        tools: [
            "Caliper Piston Compressor Tool",
            "Torque Wrench",
            "Wire Brush / Hub Cleaning Kit",
            "Micrometer (to measure rotor thickness)"
        ],
        steps: [
            "Measure rotor thickness and compare against manufacturer minimum discard specifications.",
            "Inspect brake hoses for cracks, bulges, or twists.",
            "Thoroughly clean the hub surface using a wire brush to prevent lateral runout, which causes pulsation.",
            "Clean and lubricate the caliper slide pins with high-temperature silicone brake grease.",
            "Install new pad hardware (abutment clips) to ensure pads can slide freely without binding.",
            "Perform proper brake pad bedding (break-in) procedure immediately after installation."
        ],
        warnings: [
            "Do not use petroleum-based lubricants on brake rubber components; they will swell and fail.",
            "Avoid breathing brake dust. Use brake parts cleaner in a well-ventilated area."
        ]
    },
    "calipers": {
        symptoms: [
            "Vehicle pulls aggressively to one side when braking.",
            "One wheel is excessively hot or smells like burning brakes.",
            "Uneven brake pad wear (inboard pad worn significantly more than outboard pad).",
            "Brake fluid leaking around the piston dust boot."
        ],
        tools: [
            "Line Wrenches (Flare Nut Wrenches)",
            "Brake Bleeder Kit",
            "Caliper Hanger Hooks",
            "Torque Wrench"
        ],
        steps: [
            "Inspect the brake hose. Internal hose failure can act as a check valve, keeping the caliper applied.",
            "Do NOT let the caliper hang by the rubber brake hose. Support it with a hanger hook.",
            "Always use new copper crush washers on the banjo bolt. Torque to specification.",
            "Ensure the bleeder screw is positioned at the highest point of the caliper when mounted. If it's at the bottom, the caliper is on the wrong side of the vehicle.",
            "Bleed the brake system starting from the wheel furthest from the master cylinder."
        ],
        warnings: [
            "Brake fluid aggressively destroys vehicle paint. Immediately flush spills with water.",
            "Use only the correct DOT-rated brake fluid specified on the master cylinder cap."
        ]
    },
    "general": {
        symptoms: [
            "Intermittent operational failures.",
            "Dashboard warning indicators.",
            "Abnormal noises or fluid leaks."
        ],
        tools: [
            "OBD-II Scan Tool",
            "Digital Multimeter",
            "Service Manual for Torque Specifications"
        ],
        steps: [
            "Perform a visual inspection of the affected system, checking for obvious physical damage.",
            "Check for Diagnostic Trouble Codes (DTCs) in the vehicle computer.",
            "Inspect wiring harnesses and connectors for corrosion, pushed pins, or chafing.",
            "Verify all related fuses and relays are operational.",
            "Review Technical Service Bulletins (TSBs) from the manufacturer before replacing expensive components.",
            "Verify correct installation orientation and torque specifications."
        ],
        warnings: [
            "Always wear appropriate PPE (safety glasses and gloves).",
            "Consult the vehicle's specific factory service manual before performing unfamiliar repairs."
        ]
    }
};

indexData.forEach(item => {
    let partKey = item.partType.toLowerCase().replace(/[^a-z]/g, '');
    if (!expertData[partKey]) {
        partKey = "general";
    }
    
    const data = expertData[partKey];
    const partDisplay = item.partType !== 'Unknown / General' ? item.partType.toUpperCase() : 'GENERAL';
    const refId = item.tbsName.replace(/TBS|TBA/g, '');
    
    // Generate the HTML for the expert data
    const symptomsHtml = data.symptoms.map(s => `<li>${s}</li>`).join('\n');
    const toolsHtml = data.tools.map(t => `<span class="tool-tag">${t}</span>`).join('\n');
    const stepsHtml = data.steps.map(s => `<li>${s}</li>`).join('\n');
    const warningsHtml = data.warnings.map(w => `<div class="warning-box"><strong>⚠ CAUTION:</strong> ${w}</div>`).join('\n');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${partDisplay} ADVICE GUIDE - Ref: ${refId}</title>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #0c0c0c;
            --color-text: #f0f0f0;
            --color-accent: #e52e2e;
            --color-surface: #1a1a1a;
            --color-surface-hover: #262626;
        }
        body {
            background-color: var(--color-bg);
            color: var(--color-text);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 4rem 2rem;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: var(--color-surface);
            padding: 4rem;
            border-top: 6px solid var(--color-accent);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .header-section {
            border-bottom: 2px solid rgba(255,255,255,0.1);
            padding-bottom: 2rem;
            margin-bottom: 3rem;
        }
        h1 {
            font-family: 'Oswald', sans-serif;
            font-size: 3.5rem;
            text-transform: uppercase;
            margin: 0 0 0.5rem 0;
            color: var(--color-text);
            line-height: 1.1;
        }
        .meta {
            display: inline-block;
            background-color: var(--color-accent);
            color: white;
            padding: 0.3rem 1rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-family: 'Oswald', sans-serif;
        }
        h2 {
            font-family: 'Oswald', sans-serif;
            font-size: 2rem;
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
            color: var(--color-accent);
        }
        p {
            font-size: 1.15rem;
            color: #ddd;
            margin-bottom: 1.5rem;
        }
        .summary-box {
            background-color: rgba(255,255,255,0.03);
            border-left: 4px solid var(--color-text);
            padding: 1.5rem;
            font-size: 1.2rem;
            margin-bottom: 3rem;
            font-style: italic;
        }
        .tool-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 3rem;
        }
        .tool-tag {
            background-color: rgba(229, 46, 46, 0.1);
            border: 1px solid rgba(229, 46, 46, 0.3);
            color: #ff8888;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
        }
        ul.styled-list {
            list-style: none;
            padding: 0;
            margin-bottom: 3rem;
        }
        ul.styled-list li {
            position: relative;
            padding-left: 2rem;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            color: #ccc;
        }
        ul.styled-list li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--color-accent);
            font-weight: bold;
        }
        .warning-box {
            background-color: rgba(255, 165, 0, 0.1);
            border: 1px solid rgba(255, 165, 0, 0.5);
            color: #ffd700;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border-radius: 4px;
        }
        .back-link {
            display: inline-block;
            margin-top: 4rem;
            color: var(--color-bg);
            background-color: var(--color-text);
            text-decoration: none;
            padding: 1rem 2rem;
            text-transform: uppercase;
            font-size: 1rem;
            font-weight: bold;
            font-family: 'Oswald', sans-serif;
            transition: all 0.3s;
        }
        .back-link:hover {
            background-color: var(--color-accent);
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-section">
            <div class="meta">Ref: ${refId}</div>
            <h1>${partDisplay} DIAGNOSTIC GUIDE</h1>
        </div>
        
        <h2>Document Overview</h2>
        <div class="summary-box">
            ${item.summary}
        </div>

        <h2>Common Failure Symptoms</h2>
        <ul class="styled-list">
            ${symptomsHtml}
        </ul>

        <h2>Required Diagnostic Tools</h2>
        <div class="tool-grid">
            ${toolsHtml}
        </div>

        <h2>Step-by-Step Diagnostic Procedures</h2>
        <ul class="styled-list">
            ${stepsHtml}
        </ul>

        <h2>Critical Safety Warnings</h2>
        ${warningsHtml}
        
        <a href="/" class="back-link">Return to Search</a>
    </div>
</body>
</html>`;

    const outPath = path.join(outputDir, `${item.tbsName}.html`);
    fs.writeFileSync(outPath, htmlContent);
});

console.log(`Generated ${indexData.length} highly detailed HTML pages.`);
