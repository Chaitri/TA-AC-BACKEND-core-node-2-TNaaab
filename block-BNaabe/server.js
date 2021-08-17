const http = require('http');
const qs = require('querystring');

// Q. Create a server using http

// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```

// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

const server = http.createServer(handleRequest).listen(3000);

function handleRequest(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/') {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(body);
    }
  });
}

// Q. Follow above steps with form data from postman instead of json data.

// - once data has been captured, send only captain's name in response.

function handleRequest(req, res) {
  let body = '';
  let contentType = req.headers['content-type'];
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (contentType === 'application/json') {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(body);
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      let parsedObj = qs.parse(body);
      res.setHeader('Content-Type', 'text/plain');
      res.end(parsedObj.captain);
    }
  });
}

// Q. Create server which can handle both json/form data without specifying which format of data is being received.

// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

const serverQ2 = http.createServer(handleRequestQ2).listen(9000);

function handleRequestQ2(req, res) {
  const contentType = req.headers['content-type'];
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
      let parsedData = qs.parse(body);
      res.end(JSON.stringify(parsedData));
    }
  });
}

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

const serverQ3 = http.createServer(handleRequestQ3).listen(8000);

function handleRequestQ3(req, res) {
  const contentType = req.headers['content-type'];
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (contentType === 'application/json') {
      res.setHeader('Content-Type', 'text/html');
      let parsedData = JSON.parse(body);
      let htmlResponse = `<h1>Name: ${parsedData.name}</h1> <h2>Email: ${parsedData.email}</h2>`;
      res.end(htmlResponse);
    }
  });
}

// Q. Follow above question with form data containing fields i.e name and email.

// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

function handleRequestQ3(req, res) {
  const contentType = req.headers['content-type'];
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (contentType === 'application/json') {
      res.setHeader('Content-Type', 'text/html');
      let parsedData = JSON.parse(body);
      let htmlResponse = `<h1>Name: ${parsedData.name}</h1> <h2>Email: ${parsedData.email}</h2>`;
      res.end(htmlResponse);
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      res.setHeader('Content-Type', 'text/html');
      let parsedData = qs.parse(body);
      let htmlResponse = `<h2>Email: ${parsedData.email}</h2>`;
      res.end(htmlResponse);
    }
  });
}
