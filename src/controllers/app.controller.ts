import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import type { Artist } from '../types/ArtistType';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('artists')
  getArtists(): Promise<Artist[]> {
    return this.appService.getArtists();
  }
}
