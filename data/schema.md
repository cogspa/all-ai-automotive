# ALL AI AUTOMOTIVE — Bulletin Schema v2

Every bulletin in `searchIndex.json` conforms to this shape.

```ts
type Bulletin = {
  // Identity
  id: string;                        // "TBS0125" — stable, used for URLs and cross-references
  type: "diagnostic" | "installation" | "tsb" | "recall";
  title: string;                     // Human-readable title shown in cards and pages

  // Classification
  partType: string;                  // Slug from parts-taxonomy.json (e.g. "starter")
  partCategory: string;              // Top-level group (e.g. "engine-electrical")
  difficulty: "beginner" | "intermediate" | "advanced" | "professional";
  estTimeMinutes: number;            // Realistic time to complete the procedure
  lastUpdated: string;               // ISO date

  // Vehicle applicability — empty array = applies to all vehicles
  applicability: Array<{
    make: string;                    // "Nissan" — matches NHTSA vPIC casing
    model?: string;                  // Omit to apply to all models for that make
    yearStart: number;
    yearEnd: number;                 // Use 9999 for "and later"
    engines?: string[];              // Optional engine codes ("2.5L QR25DE")
    notes?: string;                  // Free-form caveat ("Excludes Hybrid trim")
  }>;

  // Body — required fields vary by `type`
  summary: string;                   // 1–2 sentence elevator pitch shown in search results

  symptoms?: string[];               // For diagnostic bulletins
  causes?: string[];                 // Likely root causes, ordered most to least common

  tools?: Array<{
    name: string;
    required: boolean;               // false = nice-to-have
    note?: string;                   // "10mm deep socket" specificity
  }>;

  parts?: Array<{                    // Consumables / replacement parts needed
    name: string;
    quantity: number;
    note?: string;
  }>;

  steps?: Array<{
    order: number;
    title: string;                   // Short step header
    instruction: string;             // Full instruction text
    spec?: string;                   // Measurement / specification ("≤ 0.5V drop")
    warning?: string;                // Step-level caution
    image?: string;                  // Optional image path
  }>;

  torqueSpecs?: Array<{
    fastener: string;                // "Starter mounting bolts"
    value: number;
    unit: "ft-lb" | "Nm" | "in-lb";
    sequence?: string;               // "Cross-pattern, 2 passes"
  }>;

  fluidSpecs?: Array<{               // For systems that involve fluid
    system: string;                  // "Brake hydraulic"
    type: string;                    // "DOT 3 / DOT 4"
    capacity?: string;
  }>;

  warnings?: string[];               // Top-level safety callouts
  tips?: string[];                   // Pro-tips that don't fit step-by-step

  // Cross-references
  relatedBulletins?: string[];       // Other bulletin IDs
  externalRefs?: Array<{
    label: string;
    url: string;
  }>;
};
```

## Field rules

- `applicability` with empty array → universal (e.g. general battery testing procedure).
- `make` strings must match NHTSA vPIC API casing. Run `scripts/validate-makes.cjs` after edits.
- `yearEnd: 9999` is the convention for open-ended ranges; the UI displays "+".
- `difficulty` maps to UI badges: 🟢 beginner, 🟡 intermediate, 🟠 advanced, 🔴 professional.
- A bulletin of `type: "installation"` MUST have `steps` and SHOULD have `torqueSpecs`.
- A bulletin of `type: "diagnostic"` MUST have `symptoms` and `causes`.

## Why this shape

The old format had `summary` as the only content field, which is why 35 of 39 bulletins
read identically. Splitting symptoms / steps / torque specs into typed arrays means the
generator can render genuinely differentiated pages and the search index can weight
fields independently (a query for "won't crank" should hit `symptoms` harder than `summary`).
