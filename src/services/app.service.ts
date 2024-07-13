import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from '../models/artist';

@Injectable()
export class AppService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}
  getArtists(): Promise<Artist[]> {
    return this.artistModel.find().exec();
  }
}
