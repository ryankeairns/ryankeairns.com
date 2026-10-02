import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { developerTokenFromEnv, loadEnvFile } from './apple-music.mjs';

/**
 * Serves the MusicKit authorization page on localhost. MusicKit needs a secure
 * context, which file:// does not reliably provide, and localhost counts.
 */
loadEnvFile();

const PORT = Number(process.env.PORT ?? 4545);
const PAGE = new URL('./musickit-token.html', import.meta.url);
const token = developerTokenFromEnv();

const server = createServer((request, response) => {
  if (request.url === '/developer-token') {
    response.writeHead(200, { 'content-type': 'text/plain', 'cache-control': 'no-store' });
    response.end(token);
    return;
  }

  if (request.url === '/' || request.url?.startsWith('/?')) {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(readFileSync(PAGE, 'utf8'));
    return;
  }

  response.writeHead(404, { 'content-type': 'text/plain' });
  response.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Apple Music authorization: http://localhost:${PORT}`);
  console.log('Sign in, copy the music user token into .env, then stop this with Ctrl+C.');
});
