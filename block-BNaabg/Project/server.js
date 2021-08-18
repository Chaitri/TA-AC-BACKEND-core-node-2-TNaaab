const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const PORT = 3000;

const server = http.createServer(handleRequest).listen(PORT);

function handleRequest(req, res) {
  // read data
  let userData = '';
  req.on('data', (chunk) => {
    userData += chunk;
  });

  let parsedUrl = url.parse(req.url, true);
  let usersDir = path.join(__dirname, '/users');

  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/users') {
      // create user file

      let parsedUserData = JSON.parse(userData);
      let username = parsedUserData.username;
      let filePath = path.join(usersDir, username);
      fs.open(filePath + '.json', 'wx', (err, fd) => {
        if (err) console.error(err);
        fs.writeFile(fd, userData, (err) => {
          if (err) console.error(err);
        });
        fs.close(fd, (err) => {
          if (err) console.error(err);
          // send success response
          else res.end(`${username} successfully created!`);
        });
      });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/users') {
      // extract username
      let username = parsedUrl.query.username;
      let filePath = path.join(usersDir, username);
      res.setHeader('Content-Type', 'application/json');
      fs.createReadStream(filePath + '.json').pipe(res);
    } else if (req.method === 'PUT' && parsedUrl.pathname === '/users') {
      // update user
      let username = parsedUrl.query.username;
      let filePath = path.join(usersDir, username);
      fs.open(filePath + '.json', 'r+', (err, fd) => {
        if (err) console.err(err);
        else {
          fs.ftruncate(fd, (err) => {
            if (err) console.error(err);
            else {
              fs.writeFile(fd, userData, (err) => {
                if (err) console.error(err);
              });
              fs.close(fd, (err) => {
                if (err) console.error(err);
                // send success response
                else res.end(`${username} successfully updated!`);
              });
            }
          });
        }
      });
    } else if (req.method === 'DELETE' && parsedUrl.pathname === '/users') {
      let username = parsedUrl.query.username;
      let filePath = path.join(usersDir, username);
      fs.unlink(filePath + '.json', (err) => {
        if (err) console.error(err);
        else {
          res.end(`${username} profile has been sucessfully deleted!`);
        }
      });
    } else {
      res.writeHead(404, 'Page Not Found');
      res.end();
    }
  });
}
