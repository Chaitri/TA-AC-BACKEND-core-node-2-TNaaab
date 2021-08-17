const http = require('http');
const qs = require('querystring');

const server = http.createServer(handleRequest).listen(7000);

function handleRequest(req, res) {
  let contentType = req.headers['content-type'];
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (contentType === 'application/json') {
      res.setHeader('Content-Type', 'application/json');
      res.end(body);
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      res.setHeader('Content-Type', 'text/plain');
      let parsedData = qs.parse(body);
      res.end(JSON.stringify(parsedData));
    }
  });
}
