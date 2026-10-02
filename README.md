# ryankeairns.com

Personal site for Ryan Keairns. One page: identity, a short introduction, work, selected work, and a "Currently" line with Seattle weather and the latest Apple Music track.

```bash
npm install
npm run dev
npm run build
```

## Edit content

- Profile, introduction, and links: `src/data/profile.ts`
- Elastic, selected work, and previous employers: `src/data/work.ts`
- Latest track: `src/data/listening.json`

Chef and the startups years came from the previous version of this site, which recorded dates but never titles. Add a `role` to those entries in `src/data/work.ts` when you want them shown; the markup omits it when absent.

## Seattle weather

Weather is loaded in the browser from [Open-Meteo](https://open-meteo.com/) for Seattle and refreshes about every 10 minutes. No API key. If the request fails, the row falls back to showing just the location.

## Apple Music

**Currently hidden.** `src/data/listening.json` holds placeholder data, and `Currently.astro` omits the track row while `placeholder` is `true`. Setting real data — by running the steps below or by editing the JSON and setting `placeholder` to `false` — makes the row appear again. Nothing else needs changing.

Enabling it for real needs a paid Apple Developer account ($99/year), because Apple Music has no public feed of someone's listening history. It requires two credentials: a **developer token** (a JWT signed with a MusicKit key, valid 12 hours) and a **music user token** (created by signing in through MusicKit in a browser, and re-created whenever it expires).

### 1. Create a MusicKit key

In the Apple Developer portal under **Certificates, Identifiers & Profiles → Keys**, create a key with **MusicKit** enabled and download the `.p8`. Apple allows that download once. Keep it outside the repo, for example `~/.secrets/AuthKey_ABC123.p8`; `.gitignore` also excludes `*.p8`.

### 2. Fill in .env

Copy `.env.example` to `.env` and set the first three values:

```bash
APPLE_TEAM_ID=            # 10-character team ID, top right of the developer portal
APPLE_KEY_ID=             # the new key's ID, also in its filename
APPLE_PRIVATE_KEY_PATH=   # absolute path to the .p8
APPLE_MUSIC_USER_TOKEN=   # filled in by step 3
```

### 3. Sign in for a music user token

```bash
npm run listening:auth
```

This serves a small page at `http://localhost:4545` with the developer token already loaded, since MusicKit needs a secure context that `file://` does not reliably provide. Click **Sign in to Apple Music**, authorize with the Apple ID whose history should appear, then copy the token it returns into `APPLE_MUSIC_USER_TOKEN` and stop the server.

### 4. Fetch the track

```bash
npm run listening
```

This writes the most recent track into `src/data/listening.json`, which the site reads at build time. It also runs automatically before `npm run build`. Since the site is static, the displayed track only changes when the site is rebuilt, so a scheduled deploy is what keeps it current.

### Notes

The request is:

```text
GET https://api.music.apple.com/v1/me/recent/played/tracks?limit=1&types=songs,library-songs
Authorization: Bearer <developer token>
Music-User-Token: <music user token>
```

`types=songs,library-songs` asks for both catalog and library plays; Apple stopped returning library tracks by default in August 2026. Apple also only reports tracks played from the catalog or an album, not from a saved playlist, so the newest play may not appear.

A 401 or 403 from `npm run listening` almost always means the user token expired — run `npm run listening:auth` again. `npm run listening:token` prints just a developer token if you want to call the API by hand. You can also edit `src/data/listening.json` directly.
