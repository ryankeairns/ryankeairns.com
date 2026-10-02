import data from './listening.json';

export interface Track {
  placeholder: boolean;
  title: string;
  artist: string;
  album: string;
  url: string;
  artwork: string;
}

/**
 * Latest Apple Music track.
 * Placeholder until `npm run listening` can authenticate.
 * Setup notes: README.md → Apple Music.
 */
export const latestTrack = data as Track;
