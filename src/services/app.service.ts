import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from '../models/artist';
import { Album } from '../types/AlbumType';
import mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>) {}
  async getArtists(): Promise<object> {
    let artists = [];

    try {
      artists = await this.artistModel.find().exec();
    } catch (error) {
      return {
        success: false,
        error: 'Error fetching artists',
      };
    }

    return {
      success: true,
      data: artists,
    };
  }

  async getArtistById(id: string): Promise<object> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        error: 'Invalid ID',
      };
    }

    let artist = null;

    try {
      const artistId = new mongoose.Types.ObjectId(id);
      artist = await this.artistModel.findById(artistId).exec();
    } catch (error) {
      return {
        success: false,
        error: 'Error fetching artist',
      };
    }

    return {
      success: true,
      data: artist,
    };
  }

  async getArtistsAlbum(artistId: string, albumTitle: string): Promise<object> {
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return {
        success: false,
        error: 'Invalid ID',
      };
    }

    let album = null;

    try {
      const id = new mongoose.Types.ObjectId(artistId);
      const artist = await this.artistModel.findById(id).exec();

      if (!artist) {
        return {
          success: false,
          error: 'Artist not found',
        };
      }

      album = artist.albums.find((album: Album) => album.title === albumTitle);
    } catch (error) {
      return {
        success: false,
        error: 'Error fetching album',
      };
    }

    return {
      success: true,
      data: album,
    };
  }

  async getArtistsSuggestions(name: string): Promise<object> {
    const query = {
      name: { $regex: name, $options: 'i' },
    };

    let artist = null;

    try {
      artist = await this.artistModel.find(query).exec();
    } catch (error) {
      return {
        success: false,
        error: 'Error fetching artists',
      };
    }

    return {
      success: true,
      data: artist,
    };
  }

  async addArtist(request: Artist): Promise<object> {
    let artist = null;

    try {
      artist = await this.artistModel.create(request);
    } catch (error) {
      return {
        success: false,
        error: 'Error adding artist',
      };
    }

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        error: 'Invalid ID',
      };
    }

    let response = null;

    try {
      const artistId = new mongoose.Types.ObjectId(id);
      response = await this.artistModel.findByIdAndDelete(artistId).exec();
    } catch (error) {
      return {
        success: false,
        error: 'Error deleting artist',
      };
    }

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        error: 'Invalid ID',
      };
    }
    let artist = null;

    try {
      const artistId = new mongoose.Types.ObjectId(id);
      artist = await this.artistModel
        .findByIdAndUpdate(artistId, request)
        .exec();
    } catch (error) {
      return {
        success: false,
        error: 'Error updating artist',
      };
    }

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
