import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { DbService } from '../db/db.service';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    TrackService,
    AlbumService,
    ArtistService,
    DbService,
  ],
})
export class FavsModule {}
