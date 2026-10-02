import { createSign } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

/** Minimal .env reader so these scripts stay dependency-free. */
export function loadEnvFile() {
  if (!existsSync('.env')) return;
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

/** ES256 signatures arrive DER-encoded; JWT wants the raw r|s pair. */
function derToRaw(der) {
  if (der[0] !== 0x30) throw new Error('Invalid DER signature');
  let offset = 2;
  if (der[1] & 0x80) offset += der[1] & 0x7f;
  if (der[offset] !== 0x02) throw new Error('Invalid DER signature');
  const rLen = der[offset + 1];
  let r = der.subarray(offset + 2, offset + 2 + rLen);
  offset += 2 + rLen;
  if (der[offset] !== 0x02) throw new Error('Invalid DER signature');
  const sLen = der[offset + 1];
  let s = der.subarray(offset + 2, offset + 2 + sLen);
  if (r[0] === 0x00) r = r.subarray(1);
  if (s[0] === 0x00) s = s.subarray(1);
  if (r.length > 32 || s.length > 32) throw new Error('Unexpected ECDSA signature length');
  const raw = Buffer.alloc(64);
  r.copy(raw, 32 - r.length);
  s.copy(raw, 64 - s.length);
  return raw;
}

export function developerToken(teamId, keyId, privateKey) {
  const header = Buffer.from(JSON.stringify({ alg: 'ES256', kid: keyId })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ iss: teamId, iat: now, exp: now + 60 * 60 * 12 }),
  ).toString('base64url');
  const input = `${header}.${payload}`;
  const sign = createSign('SHA256');
  sign.update(input);
  sign.end();
  const signature = derToRaw(sign.sign(privateKey)).toString('base64url');
  return `${input}.${signature}`;
}

/**
 * Reads the three developer credentials and signs a token.
 * Exits with a readable message rather than a stack trace.
 */
export function developerTokenFromEnv() {
  const teamId = process.env.APPLE_TEAM_ID;
  const keyId = process.env.APPLE_KEY_ID;
  const keyPath = process.env.APPLE_PRIVATE_KEY_PATH;

  if (!teamId || !keyId || !keyPath) {
    console.error('Set APPLE_TEAM_ID, APPLE_KEY_ID, and APPLE_PRIVATE_KEY_PATH in .env first.');
    process.exit(1);
  }
  if (!existsSync(keyPath)) {
    console.error(`Apple Music private key not found at ${keyPath}`);
    process.exit(1);
  }
  return developerToken(teamId, keyId, readFileSync(keyPath, 'utf8'));
}
