import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Album } from '../album';
import { ObjectId } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
  @Prop()
  id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  albums: Array<Album>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
