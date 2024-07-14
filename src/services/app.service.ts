import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from '../models/artist';
import { Album } from '../types/AlbumType';
import mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}
  getArtists(): Promise<Artist[]> {
    return this.artistModel.find().exec();
  }

  getArtistById(id: string): Promise<Artist | null> {
    return this.artistModel.findById(id).exec();
  }

  async getArtistsAlbum(
    artistId: string,
    albumTitle: string,
  ): Promise<Album | []> {
    const artist = await this.artistModel.findById(artistId).exec();

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

  async deleteArtist(id: string): Promise<object> {
    const artistId = new mongoose.Types.ObjectId(id);
    const response = await this.artistModel.findByIdAndDelete(artistId).exec();

    if (!response) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      artist: response,
    };
  }

  async updateArtist(id: string, request: Artist): Promise<object> {
    const artist = await this.artistModel.findByIdAndUpdate(id, request).exec();

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
