const fs = require('fs');
const path = require('path');

const srcDir = '/Users/joem/EverythingAutomotive/ElectroRepairGuide/client/src/pages';
const destDir = '/Users/joem/EverythingAutomotive/UltraAutomotive/src/pages';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('Page.tsx') && f !== 'Home.tsx');

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  
  const titleMatch = content.match(/<h2[^>]*>(.*?)<\/h2>/);
  const title = titleMatch ? titleMatch[1] : file.replace('Page.tsx', '');
  
  const sections = [];
  const sectionNames = ['overview', 'preparation', 'diagnosis', 'installation', 'verification'];
  
  sectionNames.forEach(sec => {
    const regex = new RegExp(`{activeSection === "${sec}" && \\(([\\s\\S]*?)\\n\\s*\\)}\\s*(?:{|</section>)`);
    const match = content.match(regex);
    if (match) {
      let secContent = match[1];
      
      // Remove exactly the first opening <div ...> and the last </div>
      secContent = secContent.replace(/^\\s*<div[^>]*>/, '');
      const lastDivIndex = secContent.lastIndexOf('</div>');
      if (lastDivIndex !== -1) {
        secContent = secContent.substring(0, lastDivIndex) + secContent.substring(lastDivIndex + 6);
      }
      secContent = secContent.replace(/<h3[^>]*>(.*?)<\/h3>/g, '<h3 className="font-display text-[24px] mb-4 text-white">$1</h3>');
      secContent = secContent.replace(/<p[^>]*>/g, '<p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">');
      
      secContent = secContent.replace(/<InstallationStep title="([^"]+)"(?: \/>|>(.*?)<\/InstallationStep>)/gs, (m, t, inner) => {
        let res = `<div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">${t}</div>`;
        if (inner) {
          let ulContent = inner.replace(/<li[^>]*>(.*?)<\/li>/gs, '<li className="text-[14px] text-white/60 ml-4 list-disc mb-1">$1</li>');
          res += `<ul>${ulContent}</ul>`;
        }
        res += `</div>`;
        return res;
      });
      
      secContent = secContent.replace(/className="[^"]*text-gray-[^"]*"/g, 'className="text-white/80"');
      secContent = secContent.replace(/className="[^"]*bg-gray-[^"]*"/g, 'className="bg-transparent"');
      
      // Specifically for MasterCylindersPage inner note
      secContent = secContent.replace(/<div className="p-4 bg-transparent rounded-md border border-gray-200 mb-4">/g, '<div className="p-5 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>');
      secContent = secContent.replace(/<h4 className="font-semibold mb-2">/g, '<h4 className="font-display text-[16px] text-white mb-2">');
      secContent = secContent.replace(/<ol className="list-decimal ml-4 space-y-1">/g, '<ol className="list-decimal ml-6 space-y-1 text-[14px] text-white/60 mb-2">');
      
      sections.push(`
        <div className="rounded-3xl p-8 h-full break-inside-avoid mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          ${secContent.trim()}
        </div>
      `);
    }
  });
  
  const componentName = file.replace('.tsx', '');
  const displayTitle = title.replace(' Installation Best Practices', '').replace(' Installation', '').replace('Best Practices', '');
  
  const jsx = `import React from "react";
import TopNav from "../components/site/TopNav";
import Footer from "../components/site/Footer";

export default function ${componentName}() {
  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="font-mono-cap text-white/50">Quick Guide</span>
          <h1 className="mt-4 font-display text-white" style={{ fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
            ${displayTitle} <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          ${sections.join('\n')}
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;
  
  fs.writeFileSync(path.join(destDir, file.replace('.tsx', '.jsx')), jsx);
  console.log('Converted', file);
});
