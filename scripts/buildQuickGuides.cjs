const fs = require('fs');
const path = require('path');

const srcDir = '/Users/joem/EverythingAutomotive/ElectroRepairGuide/client/src/pages';
const outDir = path.join(__dirname, '..', 'public', 'quick-guides');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const pages = [
    { file: 'AlternatorsPage.tsx', name: 'Alternators', slug: 'alternators' },
    { file: 'StartersPage.tsx', name: 'Starters', slug: 'starters' },
    { file: 'CalipersPage.tsx', name: 'Brake Calipers', slug: 'calipers' },
    { file: 'MasterCylindersPage.tsx', name: 'Master Cylinders', slug: 'master-cylinders' },
    { file: 'BrakePadsRotorsPage.tsx', name: 'Brake Pads & Rotors', slug: 'brake-pads-rotors' },
    { file: 'BoostersPage.tsx', name: 'Brake Boosters', slug: 'boosters' },
    { file: 'WheelHubsPage.tsx', name: 'Wheel Hubs', slug: 'wheel-hubs' }
];

const escapeHTML = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

pages.forEach(page => {
    const srcPath = path.join(srcDir, page.file);
    if (!fs.existsSync(srcPath)) return;
    
    const content = fs.readFileSync(srcPath, 'utf8');
    
    // We will find all sections by looking for: activeSection === "xyz" && ( ... )
    const sectionsRegex = /activeSection === "([^"]+)" && \(\s*<div[^>]*>([\s\S]*?)<\/div>\s*\)\}/g;
    
    let sectionsHtml = '';
    
    let match;
    while ((match = sectionsRegex.exec(content)) !== null) {
        const sectionId = match[1];
        let sectionContent = match[2];
        
        // Extract h3
        const h3Match = sectionContent.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
        const sectionTitle = h3Match ? h3Match[1].trim() : sectionId;
        
        sectionsHtml += `\n<section class="section">\n  <h2>${escapeHTML(sectionTitle)}</h2>\n`;
        
        if (sectionId === 'overview') {
            // Overview has <p> tags
            const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
            let pMatch;
            while ((pMatch = pRegex.exec(sectionContent)) !== null) {
                sectionsHtml += `  <p>${escapeHTML(pMatch[1].trim().replace(/\s+/g, ' '))}</p>\n`;
            }
        } else {
            // Other sections have InstallationStep components
            const stepRegex = /<InstallationStep\s+title="([^"]+)"\s*(?:>([\s\S]*?)<\/InstallationStep>|\/>)/g;
            let stepMatch;
            sectionsHtml += `  <ol class="step-list">\n`;
            let stepCounter = 1;
            while ((stepMatch = stepRegex.exec(sectionContent)) !== null) {
                const stepTitle = stepMatch[1];
                const stepChildren = stepMatch[2];
                
                sectionsHtml += `    <li class="step">\n      <div class="step-num">${stepCounter++}</div>\n      <div class="step-body">\n        <div class="step-title">${escapeHTML(stepTitle)}</div>\n`;
                
                if (stepChildren) {
                    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
                    let liMatch;
                    let hasLi = false;
                    while ((liMatch = liRegex.exec(stepChildren)) !== null) {
                        if (!hasLi) {
                            sectionsHtml += `        <ul class="styled-list" style="margin-top: 0.5rem; margin-bottom: 0;">\n`;
                            hasLi = true;
                        }
                        sectionsHtml += `          <li style="margin-bottom: 0.2rem;">${escapeHTML(liMatch[1].trim())}</li>\n`;
                    }
                    if (hasLi) sectionsHtml += `        </ul>\n`;
                }
                
                sectionsHtml += `      </div>\n    </li>\n`;
            }
            sectionsHtml += `  </ol>\n`;
        }
        
        sectionsHtml += `</section>\n`;
    }

    const htmlLayout = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.name} Quick Guide | ALL AI AUTOMOTIVE</title>
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
h1 {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  letter-spacing: 0.5px;
  line-height: 1.0;
  margin-bottom: 1.5rem;
  color: var(--text);
}
p {
  font-size: 1.15rem;
  color: var(--text-dim);
  max-width: 70ch;
  margin-bottom: 1.5rem;
}
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
.step-list { list-style: none; padding: 0; counter-reset: step; }
.step {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
}
.step-num {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--accent);
  line-height: 1;
}
.step-title { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
.styled-list { list-style: none; padding: 0; }
.styled-list li {
  position: relative;
  padding: 0.65rem 0 0.65rem 2.25rem;
  border-bottom: 1px solid var(--border);
  color: #d0d0d0;
}
.styled-list li:last-child { border-bottom: none; }
.styled-list li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-weight: bold; }
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
  .step { grid-template-columns: 1fr; gap: 0.5rem; }
}
</style>
</head>
<body>
<div class="container">
  <div class="crumb">
    <a href="/">ALL AI AUTOMOTIVE</a> / QUICK GUIDES / ${page.name.toUpperCase()}
  </div>
  <div class="header">
    <h1>${page.name} Quick Guide</h1>
  </div>
  ${sectionsHtml}
  <a href="/" class="back-link">← Return to Search</a>
</div>
</body>
</html>`;

    fs.writeFileSync(path.join(outDir, `${page.slug}.html`), htmlLayout);
});

console.log('Quick guides generated.');
