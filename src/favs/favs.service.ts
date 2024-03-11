import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { Fav } from './entities/fav.entity';
import { DbService } from '../db/db.service';
import { ITrack, IAlbum, IArtist, IFavorites } from '../types/types';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly db: DbService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  private DbFavs: Fav = this.db.favorites;

  findAll() {
    return this.DbFavs;
  }

  addFavArtist(id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist)
      throw new UnprocessableEntityException({
        message: `Can't find artist with id: ${id}`,
      });
    this.DbFavs.artists.push(artist);
    return artist;
  }

  removeFavArtist(id: string) {
    const artistId = this.DbFavs.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistId < 0)
      throw new NotFoundException({
        message: `Can't find artist with id: ${id}`,
      });
    this.DbFavs.artists.splice(artistId, 1);
  }

  addFavTrack(id: string) {
    const track = this.trackService.findOne(id);
    if (!track)
      throw new UnprocessableEntityException({
        message: `Can't find track with id: ${id}`,
      });
    this.DbFavs.tracks.push(track);
    return track;
  }

  removeFavTrack(id: string) {
    const trackId = this.DbFavs.tracks.findIndex((track) => track.id === id);
    if (trackId < 0)
      throw new NotFoundException({
        message: `Can't find track with id: ${id}`,
      });
    this.DbFavs.tracks.splice(trackId, 1);
  }

  addFavAlbum(id: string) {
    const album = this.albumService.findOne(id);
    if (!album)
      throw new UnprocessableEntityException({
        message: `Can't find album with id: ${id}`,
      });
    this.DbFavs.albums.push(album);
    return album;
  }

  removeFavAlbum(id: string) {
    const albumId = this.DbFavs.albums.findIndex((album) => album.id === id);
    if (albumId < 0)
      throw new NotFoundException({
        message: `Can't find album with id: ${id}`,
      });
    this.DbFavs.albums.splice(albumId, 1);
  }
}
