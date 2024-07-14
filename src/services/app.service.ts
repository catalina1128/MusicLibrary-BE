import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from '../models/artist';
import { Album } from '../types/AlbumType';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}
  getArtists(): Promise<Artist[]> {
    return this.artistModel.find().exec();
  }

  getArtistById(id: Types.ObjectId): Promise<Artist[]> {
    const query = {
      _id: id,
    };

    return this.artistModel.find(query).limit(1).exec();
  }

  async getArtistsAlbum(
    artistId: Types.ObjectId,
    albumTitle: string,
  ): Promise<Album | []> {
    const query = {
      _id: new mongoose.Types.ObjectId(artistId),
    };

    const artist = await this.artistModel.findOne(query).exec();

    if (!artist) {
      return [];
    }

    const album = artist.albums.find(
      (album: Album) => album.title === albumTitle,
    );

    return album ?? [];
  }

  async getArtistsSuggestions(name: string): Promise<Artist[]> {
    const query = {
      name: { $regex: name, $options: 'i' },
    };

    return this.artistModel.find(query).exec();
  }

  async addArtist(request: Artist): Promise<object> {
    const artist = await this.artistModel.create(request);

    if (!artist) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  }

  async deleteArtist(id: Types.ObjectId): Promise<object> {
    const query = {
      _id: id,
    };
    const response = await this.artistModel.find(query).deleteOne(query).exec();

    if (response.deletedCount === 0) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      artist: response,
    };
  }

  async updateArtist(id: Types.ObjectId, request: Artist): Promise<object> {
    const query = {
      _id: id,
    };

    const artist = await this.artistModel.find(query).updateOne(request).exec();

    if (!artist) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  }
}
