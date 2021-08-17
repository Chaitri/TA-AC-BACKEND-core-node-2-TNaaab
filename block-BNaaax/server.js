const path = require('path');

console.log('Directory path : ', __dirname);
console.log('File path : ', __filename);

console.log(
  'Using path.join() to current file : ',
  path.join(__dirname, 'server.js')
);
