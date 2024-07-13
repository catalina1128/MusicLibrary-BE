import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Song } from '../song';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  songs: Array<Song>;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
