const fs = require('fs');
const path = require('path');

const srcDir = '/Users/joem/EverythingAutomotive/ElectroRepairGuide/client/src/pages';
const destDir = '/Users/joem/EverythingAutomotive/UltraAutomotive/src/pages';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('Page.tsx'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  
  // Extract Title
  const titleMatch = content.match(/<h2[^>]*>(.*?)<\/h2>/);
  const title = titleMatch ? titleMatch[1] : file.replace('Page.tsx', '');
  
  // Extract sections
  const sections = [];
  const sectionNames = ['overview', 'preparation', 'diagnosis', 'installation', 'verification'];
  
  sectionNames.forEach(sec => {
    // Look for content inside {activeSection === "sec" && ( ... )}
    const regex = new RegExp(`{activeSection === "${sec}" && \\(([\\s\\S]*?)\\n\\s*\\)}\\s*(?:{|</section>)`);
    const match = content.match(regex);
    if (match) {
      let secContent = match[1];
      // remove outer div
      secContent = secContent.replace(/^<div[^>]*>/, '').replace(/<\/div>$/, '');
      // replace h3 with a stylized header
      secContent = secContent.replace(/<h3[^>]*>(.*?)<\/h3>/g, '<h3 className="font-display text-[24px] mb-4 text-white">$1</h3>');
      // replace p tags
      secContent = secContent.replace(/<p[^>]*>/g, '<p className="text-[14.5px] text-white/60 mb-4 leading-relaxed">');
      // replace InstallationStep
      secContent = secContent.replace(/<InstallationStep title="([^"]+)"(?: \/>|>(.*?)<\/InstallationStep>)/gs, (m, t, inner) => {
        let res = `<div className="mb-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="font-display text-[16px] text-white mb-2">${t}</div>`;
        if (inner) {
          let ulContent = inner.replace(/<li[^>]*>(.*?)<\/li>/gs, '<li className="text-[14px] text-white/60 ml-4 list-disc mb-1">$1</li>');
          res += `<ul>${ulContent}</ul>`;
        }
        res += `</div>`;
        return res;
      });
      // specific fixes for other custom components like tables
      secContent = secContent.replace(/className="[^"]*text-gray-[^"]*"/g, 'className="text-white/80"');
      secContent = secContent.replace(/className="[^"]*bg-gray-[^"]*"/g, 'className="bg-transparent"');
      
      sections.push(`
        <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          ${secContent.trim()}
        </div>
      `);
    }
  });
  
  const componentName = file.replace('.tsx', '');
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
            ${title.replace(' Installation Best Practices', '').replace(' Installation', '')} <span className="italic-display" style={{ color: "#efe1d8" }}>Guide</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          ${sections.join('\\n')}
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
