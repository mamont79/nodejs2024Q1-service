import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavsService } from './favs.service';
import { Fav } from './entities/fav.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fav]),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
