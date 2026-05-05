// fixPages.cjs
// Repairs the broken div nesting created by convertPages.cjs + fixDivs.cjs.
// Each "card" was opening <div rounded-3xl> + <div mb-8> but only closing one,
// nesting every subsequent card inside the previous one. Tailwind's `columns-*`
// only flows DIRECT children, so the whole list collapses into one narrow column.
//
// This script:
//   1. Splits each page on the card-start anchor.
//   2. Rebuilds each card as a self-contained <div rounded-3xl><div mb-8>...</div></div>.
//   3. Discards the bogus trailing </div></div></div>... that fixDivs.cjs piled before </main>.
//
// Run: node fixPages.cjs

const fs = require("fs");
const path = require("path");

const PAGES_DIR = path.join(__dirname, "src", "pages");
const CARD_OPEN = `<div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>`;

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  // Locate the columns wrapper and the closing </main>.
  const colsOpenIdx = original.indexOf(`<div className="columns-1`);
  const mainCloseIdx = original.indexOf("</main>");
  if (colsOpenIdx === -1 || mainCloseIdx === -1) {
    console.warn(`! ${path.basename(filePath)}: could not find columns wrapper or </main>, skipping`);
    return false;
  }

  // Header = everything up to and including the columns wrapper open tag (+ its trailing newline).
  const colsOpenLineEnd = original.indexOf("\n", colsOpenIdx) + 1;
  const header = original.slice(0, colsOpenLineEnd);

  // Tail = </main> onwards.
  const tail = original.slice(mainCloseIdx);

  // Body = everything between the columns open and </main>. We will fully rewrite this.
  const body = original.slice(colsOpenLineEnd, mainCloseIdx);

  // Split the body on the card-open anchor. The first chunk is whitespace before
  // the first card; subsequent chunks each START with a card's inner content
  // (the <div mb-8> ... onward).
  const parts = body.split(CARD_OPEN);
  if (parts.length < 2) {
    console.warn(`! ${path.basename(filePath)}: no cards found, skipping`);
    return false;
  }

  // For each chunk, find the matching </div> for the FIRST <div... in it
  // (which is the <div className="mb-8"> that wraps the card content) by
  // balancing div opens/closes. lastIndexOf is unsafe for the final card
  // because trailing junk divs from fixDivs.cjs would be swept in.
  const cards = [];
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];

    const firstOpen = chunk.search(/<div\b/);
    if (firstOpen === -1) {
      console.warn(`! ${path.basename(filePath)}: card ${i} has no <div>, skipping`);
      continue;
    }

    let depth = 0;
    let closeEnd = -1;
    const re = /<div\b|<\/div>/g;
    re.lastIndex = firstOpen;
    let m;
    while ((m = re.exec(chunk)) !== null) {
      if (m[0].startsWith("</")) depth--;
      else depth++;
      if (depth === 0) {
        closeEnd = m.index + "</div>".length;
        break;
      }
    }
    if (closeEnd === -1) {
      console.warn(`! ${path.basename(filePath)}: card ${i} has unbalanced <div>, skipping`);
      continue;
    }
    cards.push(chunk.slice(0, closeEnd));
  }

  // Rebuild each card with BOTH closing tags so they are siblings, not nested.
  const rebuiltCards = cards
    .map(
      (inner) =>
        `        ${CARD_OPEN}${inner}\n        </div>\n      `
    )
    .join("\n\n");

  const rebuiltBody =
    `${parts[0].trimEnd()}\n\n${rebuiltCards}\n\n        </div>\n      `;

  const fixed = `${header}${rebuiltBody}\n${tail}`;

  if (fixed === original) {
    console.log(`= ${path.basename(filePath)} unchanged`);
    return false;
  }

  fs.writeFileSync(filePath, fixed, "utf8");

  // Sanity check: balanced div tags.
  const opens = (fixed.match(/<div\b/g) || []).length;
  const closes = (fixed.match(/<\/div>/g) || []).length;
  console.log(
    `✓ ${path.basename(filePath)} — ${cards.length} cards, divs ${opens}/${closes}${
      opens === closes ? "" : " ⚠️ UNBALANCED"
    }`
  );
  return true;
}

const files = fs
  .readdirSync(PAGES_DIR)
  .filter((f) => f.endsWith("Page.jsx"))
  .map((f) => path.join(PAGES_DIR, f));

console.log(`Fixing ${files.length} page file(s)...\n`);
files.forEach(fixFile);
console.log("\nDone.");
