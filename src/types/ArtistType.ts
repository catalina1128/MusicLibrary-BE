import type { Album } from './AlbumType.js';

export type Artist = {
  id: number;
  name: string;
  albums: Album[];
};
