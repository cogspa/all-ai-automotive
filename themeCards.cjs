const fs = require('fs');
const path = require('path');

const dir = '/Users/joem/EverythingAutomotive/UltraAutomotive/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf-8');
  
  // Split between header and cards container
  const splitStr = '<div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">';
  const splitIdx = content.indexOf(splitStr);
  
  if (splitIdx !== -1) {
    const header = content.slice(0, splitIdx + splitStr.length);
    let body = content.slice(splitIdx + splitStr.length);
    
    // Process body only
    let cardIndex = 0;
    
    // 1. Outer cards
    body = body.replace(/<div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba\(255,255,255,0.02\)", border: "1px solid rgba\(255,255,255,0.08\)" }}>/g, () => {
      const bg = cardIndex % 2 === 0 ? "var(--c-cream-2)" : "var(--c-blush)";
      cardIndex++;
      return `<div className="rounded-3xl p-8 h-full break-inside-avoid mb-6 text-[#0a0a0a]" style={{ background: "${bg}", border: "1px solid rgba(10,10,10,0.07)" }}>`;
    });
    
    // 2. h3 headers
    body = body.replace(/className="font-display text-\[24px\] mb-4 text-white"/g, 'className="font-display text-[24px] mb-4 text-[#0a0a0a]"');
    
    // 3. p tags
    body = body.replace(/className="text-\[14.5px\] text-white\/60 mb-4 leading-relaxed"/g, 'className="text-[14.5px] text-[#0a0a0a]/70 mb-4 leading-relaxed"');
    
    // 4. InstallationStep wrappers
    body = body.replace(/<div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba\(255,255,255,0.04\)", border: "1px solid rgba\(255,255,255,0.1\)" }}>/g, '<div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)" }}>');
    
    // 5. InstallationStep title
    body = body.replace(/className="font-display text-\[16px\] text-white mb-2"/g, 'className="font-display text-[16px] text-[#0a0a0a] mb-2"');
    
    // 6. InstallationStep bullet points
    body = body.replace(/className="text-\[14px\] text-white\/60 ml-4 list-disc mb-1"/g, 'className="text-[14px] text-[#0a0a0a]/65 ml-4 list-disc mb-1"');
    
    // 7. MasterCylindersPage inner notes
    body = body.replace(/style={{ background: "rgba\(255,255,255,0.02\)", border: "1px solid rgba\(255,255,255,0.08\)" }}/g, 'style={{ background: "rgba(10,10,10,0.02)", border: "1px solid rgba(10,10,10,0.06)" }}');
    body = body.replace(/className="list-decimal ml-6 space-y-1 text-\[14px\] text-white\/60 mb-2"/g, 'className="list-decimal ml-6 space-y-1 text-[14px] text-[#0a0a0a]/65 mb-2"');
    
    // 8. Catch any straggling text-white/60 or text-white classes
    body = body.replace(/text-white\/60/g, 'text-[#0a0a0a]/65');
    body = body.replace(/text-white\/80/g, 'text-[#0a0a0a]/80');
    body = body.replace(/text-white/g, 'text-[#0a0a0a]');

    content = header + body;
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Themed', file);
  }
});
