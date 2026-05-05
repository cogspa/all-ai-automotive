const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/uploads/TBS0131.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("NUM PAGES:", data.numpages);
    console.log("TEXT LENGTH:", data.text.length);
    console.log("TEXT SNIPPET:", data.text.substring(0, 100));
}).catch(function(error) {
    console.error("ERROR:", error);
});
