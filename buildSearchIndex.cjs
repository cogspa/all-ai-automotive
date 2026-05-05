const fs = require('fs');
const csv = require('csv-parser');

const results = [];
const pdfFiles = fs.readdirSync('public/uploads/').filter(f => f.endsWith('.pdf'));

fs.createReadStream('../MPA_knowledge_hub/lookup_table.csv')
  .pipe(csv(['Part Type', 'TBS Name', 'Summary']))
  .on('data', (data) => {
    // Basic clean up of summary
    let summary = data['Summary'] || '';
    summary = summary.replace(/"/g, '').trim();
    
    // Check if we have the corresponding PDF
    let tbsName = data['TBS Name'] ? data['TBS Name'].trim() : '';
    let pdfLink = pdfFiles.find(f => f.includes(tbsName)) || null;

    if(tbsName && tbsName !== 'TBS Name') {
        results.push({
          partType: data['Part Type'],
          tbsName: tbsName,
          summary: summary,
          pdfLink: pdfLink ? `/html_bulletins/${tbsName}.html` : null
        });
    }
  })
  .on('end', () => {
    // Add any PDFs that weren't in the CSV with a generic part type
    const mappedPdfNames = results.filter(r => r.pdfLink).map(r => r.pdfLink.replace('/uploads/', ''));
    pdfFiles.forEach(file => {
       if(!mappedPdfNames.includes(file)) {
           let baseName = file.replace('.pdf', '');
           results.push({
               partType: 'Unknown / General',
               tbsName: baseName,
               summary: `Diagnostic Advice Document ${baseName}. Please review the document for details.`,
               pdfLink: `/html_bulletins/${baseName}.html`
           });
       }
    });

    fs.writeFileSync('public/searchIndex.json', JSON.stringify(results, null, 2));
    console.log('Search index built successfully with ' + results.length + ' entries.');
  });
