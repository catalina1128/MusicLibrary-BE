import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../../controllers/app.controller';
import { AppService } from '../../services/app.service';
import { Artist, ArtistSchema } from './index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ArtistModule {}
