// Maps OBD systems to your existing Quick Guide routes.
// Used by Process.jsx to surface the right repair guide based on a code.

export const ALL_GUIDES = [
  { path: "/alternators",      label: "Alternators",         system: "charging" },
  { path: "/starters",         label: "Starters",            system: "starting" },
  { path: "/calipers",         label: "Brake Calipers",      system: "brakes"   },
  { path: "/master-cylinders", label: "Master Cylinders",    system: "brakes"   },
  { path: "/brake-pads-rotors",label: "Brake Pads & Rotors", system: "brakes"   },
  { path: "/boosters",         label: "Brake Boosters",      system: "brakes"   },
  { path: "/wheel-hubs",       label: "Wheel Hubs",          system: "abs"      },
];

// Default guide per system (used as a fallback if a code has no `guide` set
// but its `system` field matches one of these).
export const SYSTEM_DEFAULT_GUIDE = {
  charging: "/alternators",
  starting: "/starters",
  abs:      "/wheel-hubs",
  brakes:   "/master-cylinders",
};
