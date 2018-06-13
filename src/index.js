const fs = require('fs');
const proxy = require('http-proxy');

const proxyPort = 8899;

proxy.createServer({
  target: {
    host: 'localhost',
    port: 4711
  },
  ssl: {
    key: fs.readFileSync('~/.ssh/host_rsa', 'utf8'),
    cert: fs.readFileSync('~/.ssh/host.crt', 'utf8')
  }
}).listen(proxyPort);

console.log('Proxy to http://localhost:4711 is listening on port', proxyPort);
