const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'ENOENT') return filelist;
    }
  });
  return filelist;
}

const files = walkSync(__dirname).filter(f => !f.includes('/node_modules/') && !f.includes('/.git/') && !f.includes('/dist/') && !f.endsWith('.png') && !f.endsWith('.webp') && !f.endsWith('.pdf'));

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('ALL AI AUTOMOTIVE') || content.includes('ALL AI<span>AUTOMOTIVE')) {
            content = content.replace(/ALL AI AUTOMOTIVE/g, 'ALL AI AUTOMOTIVE');
            content = content.replace(/ALL AI<span>AUTOMOTIVE/g, 'ALL AI<span>AUTOMOTIVE');
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        }
    } catch (e) {
        // skip binaries or errors
    }
});
console.log('Done replacing names.');
