import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import type { Artist } from '../types/ArtistType';
import type { Album } from '../types/AlbumType';
import { Types } from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('artists')
  getArtists(): Promise<Artist[]> {
    return this.appService.getArtists();
  }

  @Get('artists/:id')
  getArtistById(@Param() id: Types.ObjectId): Promise<Artist[]> {
    return this.appService.getArtistById(id);
  }

  @Get('artists/:artistId/albums/:albumTitle')
  getArtistsAlbum(
    @Param() artistId: Types.ObjectId,
    @Param() albumTitle: string,
  ): Promise<Album | []> {
    return this.appService.getArtistsAlbum(artistId, albumTitle);
  }

  @Get('artists/:name/suggestions')
  getArtistsSuggestions(@Param() name: string): Promise<Artist[]> {
    return this.appService.getArtistsSuggestions(name);
  }

  @Post('/artists')
  addArtist(@Body() request: Artist): Promise<object> {
    return this.appService.addArtist(request);
  }

  @Delete('/artists/:id')
  deleteArtist(@Param() id: Types.ObjectId): Promise<object> {
    return this.appService.deleteArtist(id);
  }

  @Put('/artists/:id')
  updateArtist(
    @Param() id: Types.ObjectId,
    @Body() request: Artist,
  ): Promise<object> {
    return this.appService.updateArtist(id, request);
  }
}
