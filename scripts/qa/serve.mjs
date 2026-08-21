/**
 * Static server for dist/ that COMPRESSES, so throttled measurements mean
 * something. A plain server sends ~600kB of raw JS where Vercel sends ~164kB
 * of brotli, and metering that at 1.6Mbps inflates LCP by roughly the
 * compression ratio: local LCP read 4972ms against a plain server and 2060ms
 * against this one, in line with what production actually serves.
 *
 * Lives in the repo because the whole QA suite was twice written into /tmp and
 * twice erased by tmp cleanup. These are durable tools, not scratch.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain' };

const COMPRESSIBLE = /^(text\/|application\/(json|xml|manifest)|image\/svg)/;
const cache = new Map();

export function startServer(port = 4599) {
  const server = createServer(async (req, res) => {
    let p = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); }
    catch { p = join(ROOT, '404.html'); }
    let body;
    try { body = await readFile(p); } catch { res.writeHead(404); res.end(''); return; }

    const type = MIME[extname(p)] || 'application/octet-stream';
    const accept = req.headers['accept-encoding'] || '';
    let enc = null;

    if (COMPRESSIBLE.test(type)) {
      const key = p + (accept.includes('br') ? '|br' : accept.includes('gzip') ? '|gz' : '');
      if (cache.has(key)) { ({ body, enc } = cache.get(key)); }
      else {
        if (accept.includes('br')) {
          body = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } });
          enc = 'br';
        } else if (accept.includes('gzip')) {
          body = gzipSync(body, { level: 9 }); enc = 'gzip';
        }
        cache.set(key, { body, enc });
      }
    }

    const h = { 'Content-Type': type, 'Content-Length': body.length, 'Cache-Control': 'no-store' };
    if (enc) h['Content-Encoding'] = enc;
    res.writeHead(200, h);
    res.end(body);
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await startServer();
  console.log('serving dist/ with brotli+gzip on http://localhost:4599');
}
