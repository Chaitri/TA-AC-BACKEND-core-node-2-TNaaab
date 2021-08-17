const http = require('http');
const fs = require('fs');

const server = http.createServer(handleRequest).listen(3000);

function handleRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  fs.createReadStream('./readme.txt').pipe(res);
}
