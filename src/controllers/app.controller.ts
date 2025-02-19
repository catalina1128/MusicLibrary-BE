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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('artists')
  getArtists(): Promise<object> {
    return this.appService.getArtists();
  }

  @Get('artists/:id')
  getArtistById(@Param('id') id: string): object {
    return this.appService.getArtistById(id);
  }

  @Get('artists/:artistId/albums/:albumTitle')
  getArtistsAlbum(
    @Param('artistId') artistId: string,
    @Param('albumTitle') albumTitle: string,
  ): Promise<object> {
    return this.appService.getArtistsAlbum(artistId, albumTitle);
  }

  @Get('artists/:name/suggestions')
  getArtistsSuggestions(@Param('name') name: string): Promise<object> {
    return this.appService.getArtistsSuggestions(name);
  }

  @Post('/artists')
  addArtist(@Body() request: Artist): Promise<object> {
    return this.appService.addArtist(request);
  }

  @Delete('/artists/:id')
  deleteArtist(@Param('id') id: string): Promise<object> {
    return this.appService.deleteArtist(id);
  }

  @Put('/artists/:id')
  updateArtist(
    @Param('id') id: string,
    @Body() request: Artist,
  ): Promise<object> {
    return this.appService.updateArtist(id, request);
  }
}
