import type { Album } from './AlbumType.js';
import { Types } from 'mongoose';

export type Artist = {
  _id?: Types.ObjectId;
  name: string;
  albums: Album[];
};
