const pug = require('pug');
const fs  = require('fs');
// Compile template.pug, and render a set of data
const rendered = pug.renderFile('views/index.pug', {
  title: 'Michael Perreux'
});

fs.writeFileSync('./public/index.html', rendered);
