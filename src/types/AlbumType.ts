import type { Song } from './SongType.js';

export type Album = {
  title: string;
  description: string;
  songs: Song[];
};
