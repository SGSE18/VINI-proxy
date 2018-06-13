const fs = require('fs');
const proxy = require('http-proxy');

const proxyPort = 8899;

proxy.createServer({
  target: {
    host: 'localhost',
    port: 3311
  },
  ssl: {
    key: fs.readFileSync(process.env.HOMEPATH + '/.ssh/host_rsa', 'utf8'),
    cert: fs.readFileSync(process.env.HOMEPATH + '/.ssh/host.crt', 'utf8')
  }
}).listen(proxyPort);

console.log('Proxy to http://localhost:3311 is listening on port', proxyPort);
