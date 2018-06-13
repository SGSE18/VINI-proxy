const fs = require('fs');
const httpProxy = require('http-proxy');

const proxyPort = 8899;

let pathToKey = "/etc/letsencrypt/live/vini-ethnode.westeurope.cloudapp.azure.com/privkey.pem";
let pathToCert = "/etc/letsencrypt/live/vini-ethnode.westeurope.cloudapp.azure.com/fullchain.pem";

if(process.env['HOME'] == null || process.env['HOME'] === undefined){
  pathToKey = "../cert/domain_test.key";
  pathToCert = "../cert/domain_test.crt";
}

const proxy = httpProxy.createServer({
  target: 'http://localhost:3311',
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
