import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop()
  title: string;

  @Prop()
  lenght: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);
