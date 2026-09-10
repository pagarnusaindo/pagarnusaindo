const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const PORT = 8000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

function getIPs() {
  const list = [];
  const ifaces = os.networkInterfaces();
  Object.keys(ifaces || {}).forEach(function (name) {
    (ifaces[name] || []).forEach(function (iface) {
      if (iface.family === 'IPv4' && !iface.internal) list.push(iface.address);
    });
  });
  return list;
}

http.createServer(function (req, res) {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end('File tidak ditemukan: ' + urlPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', function () {
  const ips = getIPs();
  console.log('==============================================');
  console.log('Server jalan! Buka di HP (WiFi sama):');
  ips.forEach(function (ip) {
    console.log('  http://' + ip + ':' + PORT);
  });
  console.log('Di komputer ini: http://localhost:' + PORT);
  console.log('Stop server: tekan Ctrl + C');
  console.log('==============================================');
});