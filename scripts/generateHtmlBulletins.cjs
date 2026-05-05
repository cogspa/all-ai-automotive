#!/usr/bin/env node
// scripts/generateHtmlBulletins.cjs
//
// Reads the v2 searchIndex.json and produces a unique, content-rich HTML page
// for each bulletin. Diagnostic and installation bulletins use different
// templates, and per-part fields (torque specs, fluid specs, applicability)
// only render when present.
//
// Usage: node scripts/generateHtmlBulletins.cjs

const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '..', 'public', 'searchIndex.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'html_bulletins');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ----- HTML helpers -----------------------------------------------------------
const escape = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const DIFFICULTY_META = {
  beginner:     { label: 'Beginner',     dot: '🟢' },
  intermediate: { label: 'Intermediate', dot: '🟡' },
  advanced:     { label: 'Advanced',     dot: '🟠' },
  professional: { label: 'Professional', dot: '🔴' },
};

function fmtTime(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

function fmtYearRange(yStart, yEnd) {
  if (yEnd >= 9999) return `${yStart}+`;
  if (yStart === yEnd) return `${yStart}`;
  return `${yStart}–${yEnd}`;
}

// ----- Section renderers ------------------------------------------------------
function renderApplicability(apps) {
  if (!apps || apps.length === 0) {
    return `
      <section class="section">
        <h2>Vehicle Applicability</h2>
        <div class="applicability-tag universal">Universal — all makes and models</div>
      </section>`;
  }
  return `
    <section class="section">
      <h2>Vehicle Applicability</h2>
      <div class="applicability-grid">
        ${apps.map(a => `
          <div class="applicability-card">
            <div class="apl-make">${escape(a.make)}</div>
            ${a.model ? `<div class="apl-model">${escape(a.model)}</div>` : ''}
            <div class="apl-years">${fmtYearRange(a.yearStart, a.yearEnd)}</div>
            ${a.engines ? `<div class="apl-engines">${a.engines.map(escape).join(' · ')}</div>` : ''}
            ${a.notes ? `<div class="apl-notes">${escape(a.notes)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>`;
}

function renderSymptoms(symptoms) {
  if (!symptoms?.length) return '';
  return `
    <section class="section">
      <h2>Common Symptoms</h2>
      <ul class="styled-list">
        ${symptoms.map(s => `<li>${escape(s)}</li>`).join('')}
      </ul>
    </section>`;
}

function renderCauses(causes) {
  if (!causes?.length) return '';
  return `
    <section class="section">
      <h2>Likely Causes <span class="hint">— ordered by frequency</span></h2>
      <ol class="numbered-list">
        ${causes.map(c => `<li>${escape(c)}</li>`).join('')}
      </ol>
    </section>`;
}

function renderTools(tools) {
  if (!tools?.length) return '';
  return `
    <section class="section">
      <h2>Required Tools</h2>
      <div class="tool-grid">
        ${tools.map(t => `
          <div class="tool-card ${t.required ? 'required' : 'optional'}">
            <div class="tool-name">${escape(t.name)}</div>
            <div class="tool-meta">${t.required ? 'Required' : 'Optional'}${t.note ? ` · ${escape(t.note)}` : ''}</div>
          </div>
        `).join('')}
      </div>
    </section>`;
}

function renderParts(parts) {
  if (!parts?.length) return '';
  return `
    <section class="section">
      <h2>Parts & Consumables</h2>
      <table class="spec-table">
        <thead><tr><th>Item</th><th>Qty</th><th>Notes</th></tr></thead>
        <tbody>
          ${parts.map(p => `
            <tr>
              <td>${escape(p.name)}</td>
              <td>${p.quantity}</td>
              <td>${escape(p.note || '')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>`;
}

function renderSteps(steps) {
  if (!steps?.length) return '';
  return `
    <section class="section">
      <h2>Procedure</h2>
      <ol class="step-list">
        ${steps.map(s => `
          <li class="step">
            <div class="step-num">${s.order || ''}</div>
            <div class="step-body">
              <div class="step-title">${escape(s.title)}</div>
              <div class="step-instruction">${escape(s.instruction)}</div>
              ${s.spec ? `<div class="step-spec"><strong>Spec:</strong> ${escape(s.spec)}</div>` : ''}
              ${s.warning ? `<div class="step-warning">⚠ ${escape(s.warning)}</div>` : ''}
            </div>
          </li>
        `).join('')}
      </ol>
    </section>`;
}

function renderTorqueSpecs(specs) {
  if (!specs?.length) return '';
  return `
    <section class="section">
      <h2>Torque Specifications</h2>
      <table class="spec-table torque-table">
        <thead><tr><th>Fastener</th><th>Value</th><th>Notes</th></tr></thead>
        <tbody>
          ${specs.map(t => `
            <tr>
              <td>${escape(t.fastener)}</td>
              <td><strong>${t.value} ${escape(t.unit)}</strong></td>
              <td>${escape(t.sequence || '')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>`;
}

function renderTests(tests) {
  if (!tests?.length) return '';
  return `
    <section class="section">
      <h2>Diagnostic Tests</h2>
      <table class="spec-table">
        <thead><tr><th>Test</th><th>Specification</th></tr></thead>
        <tbody>
          ${tests.map(t => `
            <tr>
              <td>${escape(t.title)}</td>
              <td><code>${escape(t.spec)}</code></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>`;
}

function renderWarnings(warnings) {
  if (!warnings?.length) return '';
  return `
    <section class="section">
      <h2>Critical Safety Warnings</h2>
      ${warnings.map(w => `<div class="warning-box"><strong>⚠ CAUTION:</strong> ${escape(w)}</div>`).join('')}
    </section>`;
}

function renderTips(tips) {
  if (!tips?.length) return '';
  return `
    <section class="section">
      <h2>Pro Tips</h2>
      <ul class="tip-list">
        ${tips.map(t => `<li>${escape(t)}</li>`).join('')}
      </ul>
    </section>`;
}

function renderRelated(relatedIds, allBulletins) {
  if (!relatedIds?.length) return '';
  const related = relatedIds
    .map(id => allBulletins.find(b => b.id === id))
    .filter(Boolean);
  if (!related.length) return '';
  return `
    <section class="section">
      <h2>Related Bulletins</h2>
      <div class="related-grid">
        ${related.map(r => `
          <a href="${escape(r.id)}.html" class="related-card">
            <div class="related-id">${escape(r.id)}</div>
            <div class="related-title">${escape(r.title)}</div>
          </a>
        `).join('')}
      </div>
    </section>`;
}

// ----- Page template ----------------------------------------------------------
function renderPage(b, allBulletins) {
  const diff = DIFFICULTY_META[b.difficulty] || DIFFICULTY_META.intermediate;
  const typeLabel = b.type === 'diagnostic' ? 'Diagnostic Guide'
                  : b.type === 'installation' ? 'Installation Guide'
                  : b.type === 'tsb' ? 'Technical Service Bulletin'
                  : 'Recall Notice';

  // Diagnostic vs installation produces different section ordering.
  // The previous generator put the same sections in the same order for every
  // page — that's why all 35 pages read identically.
  const sections = b.type === 'diagnostic'
    ? [
        renderApplicability(b.applicability),
        renderSymptoms(b.symptoms),
        renderCauses(b.causes),
        renderTools(b.tools),
        renderTests(b.tests),
        renderWarnings(b.warnings),
        renderTips(b.tips),
        renderRelated(b.relatedBulletins, allBulletins),
      ]
    : [
        renderApplicability(b.applicability),
        renderTools(b.tools),
        renderParts(b.parts),
        renderSteps(b.steps),
        renderTorqueSpecs(b.torqueSpecs),
        renderWarnings(b.warnings),
        renderTips(b.tips),
        renderRelated(b.relatedBulletins, allBulletins),
      ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(b.title)} | ALL AI AUTOMOTIVE</title>
<meta name="description" content="${escape(b.summary)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono&family=Manrope:wght@300;400;600;800&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0a0a0a;
  --surface: #141414;
  --surface-2: #1c1c1c;
  --text: #ededed;
  --text-dim: #999;
  --accent: #e52e2e;
  --warn: #f5a623;
  --ok: #4caf50;
  --border: rgba(255,255,255,0.08);
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Manrope', sans-serif;
  --font-mono: 'DM Mono', monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.65;
  padding: 3rem 1.5rem 6rem;
}
.container {
  max-width: 920px;
  margin: 0 auto;
}

/* ----- Header --------------------------------------------------------- */
.crumb {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-dim);
  margin-bottom: 1.5rem;
}
.crumb a { color: var(--text-dim); text-decoration: none; border-bottom: 1px solid transparent; }
.crumb a:hover { color: var(--accent); border-bottom-color: var(--accent); }

.header {
  border-top: 4px solid var(--accent);
  padding-top: 2rem;
  margin-bottom: 3rem;
}
.header-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 2px;
}
.tag-id { background: var(--accent); border-color: var(--accent); color: white; }
.tag-type { background: rgba(229,46,46,0.08); color: #ff8888; }

h1 {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  letter-spacing: 0.5px;
  line-height: 1.0;
  margin-bottom: 1.5rem;
  color: var(--text);
}
.summary {
  font-size: 1.15rem;
  color: var(--text-dim);
  max-width: 70ch;
  margin-bottom: 2rem;
}
.spec-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  background: var(--surface);
  padding: 1.25rem;
  border-left: 3px solid var(--accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.spec-bar div { display: flex; flex-direction: column; gap: 0.25rem; }
.spec-bar .label { color: var(--text-dim); text-transform: uppercase; letter-spacing: 1.5px; font-size: 0.65rem; }
.spec-bar .value { color: var(--text); font-size: 0.95rem; }

/* ----- Sections ------------------------------------------------------- */
.section { margin-bottom: 3rem; }
h2 {
  font-family: var(--font-display);
  font-size: 1.85rem;
  letter-spacing: 1px;
  color: var(--accent);
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.hint { color: var(--text-dim); font-size: 0.75rem; font-family: var(--font-mono); font-weight: normal; letter-spacing: 1px; }

/* Lists */
.styled-list, .numbered-list, .tip-list { list-style: none; padding: 0; }
.styled-list li, .numbered-list li, .tip-list li {
  position: relative;
  padding: 0.65rem 0 0.65rem 2.25rem;
  border-bottom: 1px solid var(--border);
  color: #d0d0d0;
}
.styled-list li:last-child, .numbered-list li:last-child, .tip-list li:last-child { border-bottom: none; }
.styled-list li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-weight: bold; }
.numbered-list { counter-reset: cause; }
.numbered-list li { counter-increment: cause; }
.numbered-list li::before {
  content: counter(cause, decimal-leading-zero);
  position: absolute; left: 0;
  color: var(--accent); font-family: var(--font-mono);
  font-size: 0.85rem; font-weight: bold;
}
.tip-list li::before { content: '★'; position: absolute; left: 0; color: var(--warn); }

/* Tools */
.tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
.tool-card {
  background: var(--surface);
  padding: 1rem;
  border-left: 3px solid var(--border);
}
.tool-card.required { border-left-color: var(--accent); }
.tool-card.optional { border-left-color: var(--text-dim); }
.tool-name { font-weight: 600; margin-bottom: 0.25rem; }
.tool-meta { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; }

/* Tables */
.spec-table {
  width: 100%; border-collapse: collapse;
  background: var(--surface);
}
.spec-table th, .spec-table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}
.spec-table th {
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-dim);
}
.spec-table tbody tr:hover { background: rgba(255,255,255,0.02); }
.spec-table code { font-family: var(--font-mono); color: var(--warn); }

/* Steps */
.step-list { list-style: none; padding: 0; counter-reset: step; }
.step {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
  counter-increment: step;
}
.step-num {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--accent);
  line-height: 1;
}
.step-num::before { content: counter(step, decimal-leading-zero); }
.step-title { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
.step-instruction { color: #d0d0d0; margin-bottom: 0.75rem; }
.step-spec {
  font-family: var(--font-mono); font-size: 0.85rem;
  background: rgba(229,46,46,0.06); padding: 0.5rem 0.75rem;
  border-left: 2px solid var(--accent);
  margin-top: 0.5rem;
}
.step-warning {
  background: rgba(245,166,35,0.08); padding: 0.6rem 0.9rem;
  border-left: 3px solid var(--warn); color: #ffd07a;
  font-size: 0.9rem; margin-top: 0.5rem;
}

/* Applicability */
.applicability-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
.applicability-card { background: var(--surface); padding: 1rem; border-top: 2px solid var(--accent); }
.apl-make { font-family: var(--font-display); font-size: 1.4rem; color: var(--text); }
.apl-model { color: var(--text-dim); font-size: 0.95rem; }
.apl-years { font-family: var(--font-mono); color: var(--accent); margin-top: 0.5rem; font-weight: 600; }
.apl-engines, .apl-notes { font-size: 0.8rem; color: var(--text-dim); margin-top: 0.4rem; }
.applicability-tag.universal {
  background: var(--surface); padding: 1rem 1.25rem;
  border-left: 3px solid var(--ok); color: var(--text-dim);
}

/* Warnings */
.warning-box {
  background: rgba(245,166,35,0.1);
  border: 1px solid rgba(245,166,35,0.3);
  color: #ffd07a;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  border-left-width: 4px;
  border-left-color: var(--warn);
}
.warning-box strong { color: var(--warn); margin-right: 0.5rem; }

/* Related */
.related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }
.related-card {
  display: block;
  background: var(--surface); padding: 1rem;
  border-left: 2px solid var(--border);
  text-decoration: none; color: var(--text);
  transition: border-color 0.2s, transform 0.2s;
}
.related-card:hover { border-left-color: var(--accent); transform: translateX(4px); }
.related-id { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); }
.related-title { font-size: 0.9rem; margin-top: 0.4rem; }

/* Footer */
.back-link {
  display: inline-block;
  margin-top: 3rem;
  color: var(--bg);
  background: var(--text);
  padding: 1rem 2rem;
  text-decoration: none;
  font-family: var(--font-display); letter-spacing: 2px;
  transition: background 0.2s;
}
.back-link:hover { background: var(--accent); color: white; }

@media (max-width: 600px) {
  body { padding: 2rem 1rem 4rem; }
  .step { grid-template-columns: 1fr; gap: 0.5rem; }
  .step-num { font-size: 2rem; }
}
</style>
</head>
<body>
<div class="container">

  <div class="crumb">
    <a href="/">ALL AI AUTOMOTIVE</a> / ${escape(b.partCategory.replace(/-/g, ' '))} / ${escape(b.partType.replace(/-/g, ' '))}
  </div>

  <div class="header">
    <div class="header-meta">
      <span class="tag tag-id">${escape(b.id)}</span>
      <span class="tag tag-type">${escape(typeLabel)}</span>
      <span class="tag">${diff.dot} ${escape(diff.label)}</span>
      <span class="tag">⏱ ${fmtTime(b.estTimeMinutes)}</span>
    </div>
    <h1>${escape(b.title)}</h1>
    <p class="summary">${escape(b.summary)}</p>
    <div class="spec-bar">
      <div><span class="label">Bulletin</span><span class="value">${escape(b.id)}</span></div>
      <div><span class="label">Part</span><span class="value">${escape(b.partType.replace(/-/g, ' '))}</span></div>
      <div><span class="label">Difficulty</span><span class="value">${escape(diff.label)}</span></div>
      <div><span class="label">Est. Time</span><span class="value">${fmtTime(b.estTimeMinutes)}</span></div>
      <div><span class="label">Updated</span><span class="value">${escape(b.lastUpdated)}</span></div>
    </div>
  </div>

  ${sections.join('\n')}

  <a href="/" class="back-link">← Return to Search</a>
</div>
</body>
</html>`;
}

// ----- Main -------------------------------------------------------------------
function main() {
  console.log('→ Reading', INDEX_PATH);
  const bulletins = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  console.log(`→ Generating ${bulletins.length} HTML pages`);

  // Make step.order optional in source data — fill from index
  for (const b of bulletins) {
    if (b.steps) b.steps.forEach((s, i) => { if (!s.order) s.order = i + 1; });
  }

  for (const b of bulletins) {
    const html = renderPage(b, bulletins);
    const outPath = path.join(OUTPUT_DIR, `${b.id}.html`);
    fs.writeFileSync(outPath, html);
  }

  // Per-part stats so it's obvious how the differentiation works
  const partLengths = {};
  for (const b of bulletins) {
    const html = renderPage(b, bulletins);
    partLengths[b.partType] = partLengths[b.partType] || [];
    partLengths[b.partType].push(html.length);
  }
  console.log('\n→ Per-part HTML size variation (bytes):');
  for (const [part, sizes] of Object.entries(partLengths)) {
    const avg = Math.round(sizes.reduce((a,b)=>a+b,0) / sizes.length);
    console.log(`    ${part.padEnd(20)} ${sizes.length} pages, ~${avg.toLocaleString()} bytes each`);
  }

  console.log(`\n✓ Wrote ${bulletins.length} pages to ${OUTPUT_DIR}`);
}

if (require.main === module) main();
