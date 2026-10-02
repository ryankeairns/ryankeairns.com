import { existsSync, writeFileSync } from 'node:fs';
import { developerTokenFromEnv, loadEnvFile } from './apple-music.mjs';

const OUTPUT = new URL('../src/data/listening.json', import.meta.url);

function artworkUrl(template) {
  if (!template) return '';
  return template.replace('{w}', '80').replace('{h}', '80');
}

loadEnvFile();

const keyPath = process.env.APPLE_PRIVATE_KEY_PATH;
const userToken = process.env.APPLE_MUSIC_USER_TOKEN;

/**
 * `--print-token` emits only the developer token, which MusicKit needs before
 * a music user token can exist. Chicken and egg, so it runs without one.
 */
if (process.argv.includes('--print-token')) {
  console.log(developerTokenFromEnv());
  process.exit(0);
}

const provided = [process.env.APPLE_TEAM_ID, process.env.APPLE_KEY_ID, keyPath, userToken].filter(
  Boolean,
);

if (provided.length === 0) {
  console.log('Apple Music credentials not set. Leaving listening data unchanged.');
  process.exit(0);
}

if (provided.length < 4) {
  console.error(
    'Apple Music credentials are incomplete. Set APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY_PATH, and APPLE_MUSIC_USER_TOKEN.',
  );
  process.exit(1);
}

if (!existsSync(keyPath)) {
  console.error(`Apple Music private key not found at ${keyPath}`);
  process.exit(1);
}

const token = developerTokenFromEnv();
const endpoint = new URL('https://api.music.apple.com/v1/me/recent/played/tracks');
endpoint.searchParams.set('limit', '1');
endpoint.searchParams.set('types', 'songs,library-songs');

const response = await fetch(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Music-User-Token': userToken,
  },
});

if (!response.ok) {
  const body = await response.text();
  console.error(`Apple Music request failed (${response.status}): ${body.slice(0, 300)}`);
  if (response.status === 401 || response.status === 403) {
    console.error('A 401 or 403 usually means the music user token expired. Run `npm run listening:auth`.');
  }
  process.exit(1);
}

const payload = await response.json();
const song = payload.data?.[0];
const attributes = song?.attributes;

if (!attributes?.name || !attributes?.artistName) {
  console.error('Apple Music returned no recent track.');
  process.exit(1);
}

const track = {
  placeholder: false,
  title: attributes.name,
  artist: attributes.artistName,
  album: attributes.albumName ?? '',
  url: attributes.url ?? '',
  artwork: artworkUrl(attributes.artwork?.url),
};

writeFileSync(OUTPUT, `${JSON.stringify(track, null, 2)}\n`);
console.log(`Updated listening data: ${track.title} — ${track.artist}`);
