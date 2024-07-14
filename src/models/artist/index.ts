import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Album } from '../album';
import { Types } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
  _id?: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  albums: Array<Album>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
