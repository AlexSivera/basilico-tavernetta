// Servidor estático mínimo para previsualizar dist/ (node scripts/serve.mjs)
// Con BASE_PATH=basilico-tavernetta simula la subcarpeta de GitHub Pages.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT) || 4173;
const BASE = '/' + (process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

http.createServer((req, res) => {
  let url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (BASE !== '/') {
    if (!url.startsWith(BASE)) { res.writeHead(404).end(); return; }
    url = url.slice(BASE.length) || '/';
  }
  let file = path.join(DIST, url);
  if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404, { 'content-type': types['.html'] }); fs.createReadStream(path.join(DIST, '404.html')).pipe(res); return; }
  res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Basilico → http://localhost:${PORT}${BASE === '/' ? '/' : BASE + '/'}`));
