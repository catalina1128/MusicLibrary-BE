import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Album } from '../album';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  albums: Array<Album>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
