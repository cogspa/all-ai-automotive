#!/usr/bin/env node
// scripts/migrate.cjs
//
// Migrates the legacy public/searchIndex.json (flat partType + summary) to
// the v2 schema with structured fields. Pulls per-part content from
// data/part-content.cjs and detects vehicle applicability hints in summaries.
//
// Usage: node scripts/migrate.cjs
//
// Reads:  public/searchIndex.json (legacy)
// Writes: public/searchIndex.json (v2 — backed up to .legacy.json first)

const fs = require('fs');
const path = require('path');

const partContent = require('../data/part-content.cjs');
const taxonomy = require('../data/parts-taxonomy.json');

const LEGACY_PATH = path.join(__dirname, '..', 'public', 'searchIndex.json');
const BACKUP_PATH = path.join(__dirname, '..', 'public', 'searchIndex.legacy.json');
const OUT_PATH    = path.join(__dirname, '..', 'public', 'searchIndex.json');

// ----- Part-type normalization ------------------------------------------------
// The legacy data uses inconsistent labels ("starter", "Unknown / General").
// Map every variation to a canonical taxonomy id.
const PART_TYPE_ALIASES = {
  'starter':                 'starter',
  'starters':                'starter',
  'alternator':              'alternator',
  'alternators':             'alternator',
  'brake pad':               'brake-pad',
  'brake pads':              'brake-pad',
  'brake pads & rotors':     'brake-pad',
  'brakepads':               'brake-pad',
  'rotor':                   'brake-rotor',
  'rotors':                  'brake-rotor',
  'caliper':                 'brake-caliper',
  'calipers':                'brake-caliper',
  'master cylinder':         'master-cylinder',
  'mastercylinder':          'master-cylinder',
  'brake booster':           'brake-booster',
  'booster':                 'brake-booster',
  'wheel hub':               'wheel-hub',
  'wheel hubs':              'wheel-hub',
  'wheelhub':                'wheel-hub',
  'ignition coil':           'ignition-coil',
  'oxygen sensor':           'oxygen-sensor',
  'o2 sensor':               'oxygen-sensor',
  'unknown / general':       'general',
  'unknown':                 'general',
  'general':                 'general',
};

function normalizePartType(raw) {
  if (!raw) return 'general';
  const key = raw.toLowerCase().trim();
  return PART_TYPE_ALIASES[key] || 'general';
}

function findCategory(partTypeId) {
  for (const cat of taxonomy.categories) {
    if (cat.parts.some(p => p.id === partTypeId)) return cat.id;
  }
  return 'general';
}

// ----- Vehicle applicability detection ----------------------------------------
// Many legacy summaries mention a make/model/year in plain text. Pattern-match
// to extract structured applicability where possible.
const MAKE_PATTERNS = [
  'Acura','Audi','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ford',
  'GMC','Honda','Hyundai','Infiniti','Jeep','Kia','Lexus','Lincoln','Mazda',
  'Mercedes-Benz','Mitsubishi','Nissan','Pontiac','Porsche','Ram','Subaru',
  'Toyota','Volkswagen','Volvo'
];

function detectApplicability(text) {
  if (!text) return [];
  const apps = [];
  const lower = text.toLowerCase();

  for (const make of MAKE_PATTERNS) {
    if (lower.includes(make.toLowerCase())) {
      // Try to find a year range nearby: "2007-2012" or "2007 to 2012"
      const yearRangeMatch = text.match(/(\d{4})\s*[-–to]+\s*(\d{4})/);
      const singleYearMatch = text.match(/\b(19|20)\d{2}\b/);

      let yearStart = 1995, yearEnd = 9999;
      if (yearRangeMatch) {
        yearStart = parseInt(yearRangeMatch[1], 10);
        yearEnd = parseInt(yearRangeMatch[2], 10);
      } else if (singleYearMatch) {
        yearStart = parseInt(singleYearMatch[0], 10);
        yearEnd = yearStart;
      }

      apps.push({
        make,
        yearStart,
        yearEnd,
        notes: 'Auto-detected from legacy summary — verify before relying'
      });
    }
  }
  return apps;
}

// ----- Difficulty inference ---------------------------------------------------
const DIFFICULTY_BY_PART = {
  'starter':            'intermediate',
  'alternator':         'intermediate',
  'battery':            'beginner',
  'spark-plug':         'beginner',
  'ignition-coil':      'beginner',
  'brake-pad':          'intermediate',
  'brake-rotor':        'intermediate',
  'brake-caliper':      'intermediate',
  'master-cylinder':    'advanced',
  'brake-booster':      'advanced',
  'wheel-hub':          'advanced',
  'cv-axle':            'advanced',
  'oxygen-sensor':      'intermediate',
  'fuel-pump':          'advanced',
  'water-pump':         'advanced',
  'timing-belt':        'professional',
  'timing-chain':       'professional',
  'ac-compressor':      'professional',
  'general':            'intermediate',
};

const TIME_BY_PART = {
  'starter':            45,
  'alternator':         60,
  'battery':            15,
  'spark-plug':         30,
  'ignition-coil':      20,
  'brake-pad':          90,
  'brake-rotor':        90,
  'brake-caliper':      60,
  'master-cylinder':    120,
  'brake-booster':      150,
  'wheel-hub':          120,
  'cv-axle':            150,
  'oxygen-sensor':      30,
  'fuel-pump':          240,
  'water-pump':         240,
  'timing-belt':        480,
  'timing-chain':       600,
  'ac-compressor':      300,
  'general':            60,
};

// ----- Bulletin builder -------------------------------------------------------
function buildBulletin(legacy) {
  const partTypeId = normalizePartType(legacy.partType);
  const category = findCategory(partTypeId);
  const content = partContent[partTypeId] || partContent.general;

  // Bulletin type — IDs starting with TBA in the legacy set are advice/diagnostic;
  // TBS are technical service bulletins. Most starter bulletins have install info.
  const isAdvice = /^TBA/i.test(legacy.tbsName);
  const type = isAdvice ? 'diagnostic' : 'installation';

  // Pick the right sub-content
  const sub = type === 'diagnostic' ? content.diagnostic : content.installation;

  const applicability = detectApplicability(legacy.summary);

  // Generate a title: prefer specifics from legacy summary, fall back to generic
  const refId = legacy.tbsName.replace(/^(TBS|TBA)0*/i, '');
  const titlePrefix = applicability[0]?.make ? `${applicability[0].make} ` : '';
  const title = `${titlePrefix}${content.label} ${type === 'diagnostic' ? 'Diagnostic' : 'Installation'} Guide #${refId}`;

  // Cleaner summary — strip out the "Please review the document for details"
  // boilerplate and replace with something derived from the structured content.
  let summary = legacy.summary;
  if (/please review the document/i.test(summary) || summary.length < 30) {
    summary = sub.symptoms?.[0]
      || sub.steps?.[0]?.instruction?.split('.')[0]
      || `${content.label} ${type} reference for technicians.`;
  } else {
    // Light cleanup of OCR artifacts in legacy summaries
    summary = summary
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/“|”/g, '"')
      .trim();
  }

  return {
    id: legacy.tbsName,
    type,
    title,
    partType: partTypeId,
    partCategory: category,
    difficulty: DIFFICULTY_BY_PART[partTypeId] || 'intermediate',
    estTimeMinutes: TIME_BY_PART[partTypeId] || 60,
    lastUpdated: new Date().toISOString().split('T')[0],
    applicability,
    summary,
    symptoms: type === 'diagnostic' ? content.diagnostic.symptoms : undefined,
    causes:   type === 'diagnostic' ? content.diagnostic.causes : undefined,
    tools:    sub.tools || [],
    parts:    type === 'installation' ? content.installation.parts : undefined,
    steps:    type === 'installation' ? content.installation.steps : undefined,
    torqueSpecs: type === 'installation' ? content.installation.torqueSpecs : undefined,
    warnings: sub.warnings || content.installation?.warnings || [],
    tips:     sub.tips || content.installation?.tips || [],
    relatedBulletins: [],
    pdfLink: `/html_bulletins/${legacy.tbsName}.html`
  };
}

// ----- Main -------------------------------------------------------------------
function main() {
  console.log('→ Reading legacy index from', LEGACY_PATH);
  const legacyRaw = fs.readFileSync(LEGACY_PATH, 'utf8');
  const legacy = JSON.parse(legacyRaw);

  console.log(`→ Found ${legacy.length} legacy bulletins`);
  console.log('→ Backing up legacy to', BACKUP_PATH);
  fs.writeFileSync(BACKUP_PATH, legacyRaw);

  console.log('→ Migrating to v2 schema...');
  const allMigrated = legacy.map(buildBulletin);

  // Dedupe by id — the legacy file has duplicate TBS numbers (one with a real
  // part type, one filed under "Unknown / General"). Always prefer the
  // non-general entry; otherwise keep the first occurrence.
  const byId = new Map();
  for (const b of allMigrated) {
    const existing = byId.get(b.id);
    if (!existing) {
      byId.set(b.id, b);
    } else if (existing.partType === 'general' && b.partType !== 'general') {
      byId.set(b.id, b);
    }
  }
  const migrated = Array.from(byId.values());
  if (migrated.length < allMigrated.length) {
    console.log(`  Deduplicated ${allMigrated.length - migrated.length} entries (kept specific over general)`);
  }

  // Pass 2: cross-reference related bulletins (same partType, ±5 of each ID)
  for (const b of migrated) {
    b.relatedBulletins = migrated
      .filter(o => o.id !== b.id && o.partType === b.partType)
      .slice(0, 4)
      .map(o => o.id);
  }

  // Stats summary
  const partCounts = {};
  const typeCounts = {};
  for (const b of migrated) {
    partCounts[b.partType] = (partCounts[b.partType] || 0) + 1;
    typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
  }

  console.log('\n→ Migration complete');
  console.log('  By type:', typeCounts);
  console.log('  By part:', partCounts);

  fs.writeFileSync(OUT_PATH, JSON.stringify(migrated, null, 2));
  console.log(`\n✓ Wrote ${migrated.length} bulletins to ${OUT_PATH}`);
  console.log('✓ Legacy preserved at', BACKUP_PATH);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error('✗ Migration failed:', err.message);
    process.exit(1);
  }
}

module.exports = { buildBulletin, normalizePartType, detectApplicability };
