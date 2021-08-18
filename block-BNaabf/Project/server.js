const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer(handleRequest).listen(5678);

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/form') {
    fs.createReadStream('./form.html').pipe(res);
  } else if (req.method === 'POST' && req.url === '/form') {
    let formData = '';
    req.on('data', (chunk) => {
      formData += chunk;
    });
    req.on('end', () => {
      let parsedData = qs.parse(formData);
      let htmlResponse = `
        <h1>Form Data</h1>
        <p>Name: ${parsedData.name}</p>
        <p>Email: ${parsedData.email}</p>
        <p>Age: ${parsedData.age}</p>
      `;
      res.setHeader('Content-Type', 'text/html');
      res.end(htmlResponse);
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
}
