// public/main.js
// ALL AI AUTOMOTIVE v2 — YMM-aware search, fuzzy matching, NHTSA recall integration

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs';

// =============================================================================
// State
// =============================================================================
const state = {
  bulletins: [],
  taxonomy: null,
  fuse: null,
  ymm: { year: '', make: '', model: '' },
  filters: {
    query: '',
    partType: '',
    type: '',         // diagnostic | installation
    difficulty: '',
  }
};

// =============================================================================
// API endpoints (free, no key required)
// =============================================================================
const VPIC_BASE   = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const RECALL_BASE = 'https://api.nhtsa.gov/recalls/recallsByVehicle';

// =============================================================================
// Boot
// =============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  initCustomCursor();
  await Promise.all([loadBulletins(), loadTaxonomy()]);
  initFuse();
  initYMMSelector();
  initPartFilter();
  initSearch();
  initFacetChips();
  renderResults();
});

// =============================================================================
// Data loading
// =============================================================================
async function loadBulletins() {
  try {
    const res = await fetch('/searchIndex.json');
    state.bulletins = await res.json();
  } catch (err) {
    console.error('Failed to load bulletins:', err);
    state.bulletins = [];
  }
}

async function loadTaxonomy() {
  try {
    const res = await fetch('/data/parts-taxonomy.json');
    state.taxonomy = await res.json();
  } catch (err) {
    console.error('Failed to load taxonomy:', err);
    state.taxonomy = { categories: [] };
  }
}

// =============================================================================
// Fuse.js — fuzzy search across structured fields
// =============================================================================
function initFuse() {
  state.fuse = new Fuse(state.bulletins, {
    keys: [
      { name: 'symptoms',           weight: 2.0 },
      { name: 'partType',           weight: 1.8 },
      { name: 'title',              weight: 1.5 },
      { name: 'applicability.make', weight: 1.5 },
      { name: 'applicability.model',weight: 1.5 },
      { name: 'causes',             weight: 1.2 },
      { name: 'summary',            weight: 1.0 },
      { name: 'tools.name',         weight: 0.7 },
      { name: 'id',                 weight: 0.6 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2,
  });
}

// =============================================================================
// YMM cascade — Year → Make → Model via NHTSA vPIC
// =============================================================================
function initYMMSelector() {
  const yearSel  = document.getElementById('ymm-year');
  const makeSel  = document.getElementById('ymm-make');
  const modelSel = document.getElementById('ymm-model');
  const clearBtn = document.getElementById('ymm-clear');

  // Populate years (current → 1995, descending)
  const currentYear = new Date().getFullYear();
  yearSel.innerHTML = '<option value="">Year</option>';
  for (let y = currentYear; y >= 1995; y--) {
    yearSel.add(new Option(y, y));
  }

  yearSel.addEventListener('change', async () => {
    const year = yearSel.value;
    state.ymm.year = year;
    makeSel.innerHTML = '<option value="">Make</option>';
    modelSel.innerHTML = '<option value="">Model</option>';
    makeSel.disabled = true;
    modelSel.disabled = true;
    if (!year) { renderResults(); return; }

    try {
      // GetMakesForVehicleType returns all car makes; we don't need year-specific
      // since vPIC's per-year data is sparser. Filter at model step instead.
      const res = await fetch(`${VPIC_BASE}/GetMakesForVehicleType/car?format=json`);
      const { Results } = await res.json();
      const sorted = Results
        .map(r => r.MakeName)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
      sorted.forEach(name => makeSel.add(new Option(name, name)));
      makeSel.disabled = false;
    } catch (err) {
      console.warn('vPIC makes lookup failed, falling back to local list', err);
      ['Acura','Audi','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ford',
       'GMC','Honda','Hyundai','Infiniti','Jeep','Kia','Lexus','Lincoln','Mazda',
       'Mercedes-Benz','Mitsubishi','Nissan','Pontiac','Porsche','Ram','Subaru',
       'Toyota','Volkswagen','Volvo']
        .forEach(m => makeSel.add(new Option(m, m)));
      makeSel.disabled = false;
    }
  });

  makeSel.addEventListener('change', async () => {
    const year = state.ymm.year;
    const make = makeSel.value;
    state.ymm.make = make;
    modelSel.innerHTML = '<option value="">Model</option>';
    modelSel.disabled = true;
    if (!year || !make) { renderResults(); return; }

    try {
      const res = await fetch(
        `${VPIC_BASE}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`
      );
      const { Results } = await res.json();
      const sorted = (Results || [])
        .map(r => r.Model_Name)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort();
      if (sorted.length === 0) {
        modelSel.add(new Option('— No models returned —', ''));
      } else {
        sorted.forEach(m => modelSel.add(new Option(m, m)));
      }
      modelSel.disabled = false;
    } catch (err) {
      console.warn('vPIC model lookup failed', err);
      modelSel.add(new Option('— Model lookup unavailable —', ''));
    }
  });

  modelSel.addEventListener('change', () => {
    state.ymm.model = modelSel.value;
    renderResults();
    if (state.ymm.year && state.ymm.make && state.ymm.model) {
      fetchRecallsForVehicle();
    }
  });

  clearBtn?.addEventListener('click', () => {
    state.ymm = { year: '', make: '', model: '' };
    yearSel.value = '';
    makeSel.innerHTML = '<option value="">Make</option>';
    makeSel.disabled = true;
    modelSel.innerHTML = '<option value="">Model</option>';
    modelSel.disabled = true;
    document.getElementById('recall-panel').innerHTML = '';
    renderResults();
  });
}

// =============================================================================
// NHTSA Recalls — free, no key
// =============================================================================
async function fetchRecallsForVehicle() {
  const { year, make, model } = state.ymm;
  const panel = document.getElementById('recall-panel');
  panel.innerHTML = '<div class="recall-loading">Checking NHTSA database...</div>';

  try {
    const url = `${RECALL_BASE}?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${year}`;
    const res = await fetch(url);
    const { results } = await res.json();

    if (!results || results.length === 0) {
      panel.innerHTML = `
        <div class="recall-card recall-clean">
          <div class="recall-status">✓ No open recalls</div>
          <div class="recall-meta">${year} ${make} ${model} — checked against NHTSA</div>
        </div>`;
      return;
    }

    panel.innerHTML = `
      <div class="recall-header">
        <h3>⚠ ${results.length} NHTSA Recall${results.length > 1 ? 's' : ''}</h3>
        <div class="recall-vehicle">${year} ${make} ${model}</div>
      </div>
      <div class="recall-list">
        ${results.slice(0, 5).map(r => `
          <details class="recall-item">
            <summary>
              <span class="recall-component">${escapeHtml(r.Component || 'Unknown component')}</span>
              <span class="recall-id">${escapeHtml(r.NHTSACampaignNumber || '')}</span>
            </summary>
            <div class="recall-body">
              <p><strong>Summary:</strong> ${escapeHtml(r.Summary || '')}</p>
              ${r.Consequence ? `<p><strong>Consequence:</strong> ${escapeHtml(r.Consequence)}</p>` : ''}
              ${r.Remedy ? `<p><strong>Remedy:</strong> ${escapeHtml(r.Remedy)}</p>` : ''}
              ${r.ReportReceivedDate ? `<p class="recall-date">Reported ${escapeHtml(r.ReportReceivedDate)}</p>` : ''}
            </div>
          </details>
        `).join('')}
        ${results.length > 5 ? `<div class="recall-more">+ ${results.length - 5} more recalls — see <a href="https://www.nhtsa.gov/recalls" target="_blank" rel="noopener">NHTSA.gov</a></div>` : ''}
      </div>`;
  } catch (err) {
    panel.innerHTML = `<div class="recall-error">Couldn't reach NHTSA — try again later.</div>`;
    console.error(err);
  }
}

// =============================================================================
// Part type filter
// =============================================================================
function initPartFilter() {
  const sel = document.getElementById('part-filter');
  sel.innerHTML = '<option value="">All Part Types</option>';
  for (const cat of state.taxonomy.categories) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = cat.label;
    for (const part of cat.parts) {
      const opt = new Option(part.label, part.id);
      optgroup.appendChild(opt);
    }
    sel.appendChild(optgroup);
  }
  sel.addEventListener('change', () => {
    state.filters.partType = sel.value;
    renderResults();
  });
}

// =============================================================================
// Search input
// =============================================================================
function initSearch() {
  const input = document.getElementById('search-input');
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.filters.query = input.value.trim();
      renderResults();
    }, 150);
  });
}

// =============================================================================
// Facet chips (type + difficulty)
// =============================================================================
function initFacetChips() {
  document.querySelectorAll('.chip[data-facet]').forEach(chip => {
    chip.addEventListener('click', () => {
      const facet = chip.dataset.facet;
      const value = chip.dataset.value;
      const group = document.querySelectorAll(`.chip[data-facet="${facet}"]`);
      group.forEach(c => c.classList.remove('active'));
      if (state.filters[facet] === value) {
        state.filters[facet] = '';
      } else {
        state.filters[facet] = value;
        chip.classList.add('active');
      }
      renderResults();
    });
  });
}

// =============================================================================
// Result filtering & rendering
// =============================================================================
function applyFilters() {
  let results;

  // Start with fuzzy search if there's a query
  if (state.filters.query) {
    results = state.fuse.search(state.filters.query).map(r => r.item);
  } else {
    results = [...state.bulletins];
  }

  // YMM filter — bulletin must apply to this vehicle (or be universal)
  const { year, make, model } = state.ymm;
  if (year && make) {
    results = results.filter(b => {
      if (!b.applicability || b.applicability.length === 0) return true; // universal
      return b.applicability.some(a => {
        const makeMatch = a.make.toLowerCase() === make.toLowerCase();
        const yearMatch = year >= a.yearStart && year <= a.yearEnd;
        const modelMatch = !model || !a.model || a.model.toLowerCase() === model.toLowerCase();
        return makeMatch && yearMatch && modelMatch;
      });
    });
  }

  // Part type filter
  if (state.filters.partType) {
    results = results.filter(b => b.partType === state.filters.partType);
  }

  // Type filter (diagnostic / installation)
  if (state.filters.type) {
    results = results.filter(b => b.type === state.filters.type);
  }

  // Difficulty filter
  if (state.filters.difficulty) {
    results = results.filter(b => b.difficulty === state.filters.difficulty);
  }

  return results;
}

function renderResults() {
  const container = document.getElementById('results-container');
  const countEl = document.getElementById('result-count');
  const results = applyFilters();

  countEl.textContent = `${results.length} ${results.length === 1 ? 'result' : 'results'}`;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⌕</div>
        <div class="empty-title">No bulletins match your filters</div>
        <div class="empty-hint">Try clearing the YMM selector or broadening your search</div>
      </div>`;
    return;
  }

  container.innerHTML = results.map(b => renderCard(b)).join('');
}

function renderCard(b) {
  const diff = {
    beginner: '🟢 Beginner',
    intermediate: '🟡 Intermediate',
    advanced: '🟠 Advanced',
    professional: '🔴 Professional',
  }[b.difficulty] || '🟡 Intermediate';

  const typeLabel = b.type === 'diagnostic' ? 'Diagnostic' :
                    b.type === 'installation' ? 'Installation' :
                    b.type === 'tsb' ? 'TSB' : 'Recall';

  const fmtTime = (m) => m < 60 ? `${m}m` : `${Math.floor(m/60)}h${m%60 ? ` ${m%60}m` : ''}`;

  const apl = b.applicability && b.applicability.length
    ? b.applicability.slice(0, 2).map(a => {
        const yr = a.yearEnd >= 9999 ? `${a.yearStart}+` : `${a.yearStart}–${a.yearEnd}`;
        return `${a.make} ${yr}`;
      }).join(' · ')
    : 'Universal';

  return `
    <a class="result-card" href="${escapeHtml(b.pdfLink || '#')}">
      <div class="card-meta">
        <span class="card-id">${escapeHtml(b.id)}</span>
        <span class="card-type card-type-${b.type}">${typeLabel}</span>
        <span class="card-diff">${diff}</span>
        <span class="card-time">⏱ ${fmtTime(b.estTimeMinutes)}</span>
      </div>
      <h3 class="card-title">${escapeHtml(b.title)}</h3>
      <p class="card-summary">${escapeHtml(b.summary)}</p>
      <div class="card-footer">
        <span class="card-applicability">🚗 ${escapeHtml(apl)}</span>
        <span class="card-arrow">→</span>
      </div>
    </a>`;
}

// =============================================================================
// Helpers
// =============================================================================
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-outline');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function animate() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform  = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();
  document.querySelectorAll('a, select, button, input, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });
}
