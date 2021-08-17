const http = require('http');

const server = http.createServer(handleRequest).listen(3456);

function handleRequest(req, res) {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      console.log(body);
      res.write(body);
      res.end();
    });
  }
}
