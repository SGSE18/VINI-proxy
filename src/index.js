const fs = require('fs');
const httpProxy = require('http-proxy');

const proxyPort = 8899;

let pathToKey = process.env['HOME'] + '/.ssh/domain.key';
let pathToCert = process.env['HOME'] + '/.ssh/domain.crt';

if(process.env['HOME'] == null || process.env['HOME'] === undefined){
  pathToKey = "../cert/domain_test.key";
  pathToCert = "../cert/domain_test.crt";
}

const proxy = httpProxy.createServer({
  target: {
    host: "localhost",
    port: "3311",
    https: false,
    rejectUnauthorized: false
  },
  ssl: {
    key: fs.readFileSync(pathToKey, 'utf8'),
    cert: fs.readFileSync(pathToCert, 'utf8')
  },
  changeOrigin: true,
  secure: false
}).listen(proxyPort);

proxy.on('error', (err, req, res) => {
  console.log("An error occurred:", err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message:\n' + JSON.stringify(err));
});

console.log('Proxy to http://localhost:3311 is listening on port', proxyPort);
