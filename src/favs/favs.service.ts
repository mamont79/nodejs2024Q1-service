import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Fav)
    private favoriteRepository: Repository<Fav>,

    private artistService: ArtistService,

    private albumService: AlbumService,

    private trackService: TrackService,
  ) {}

  async createFavs() {
    const favs = this.favoriteRepository.create();
    return await this.favoriteRepository.save(favs);
  }

  async getFavs() {
    const favs = await this.favoriteRepository.findOneBy({ id: null });

    if (!favs) {
      const newFavs = await this.createFavs();
      await this.favoriteRepository.save(newFavs);
      return await this.favoriteRepository.findOne({
        where: { id: newFavs.id },
        relations: { albums: true, artists: true, tracks: true },
      });
    }
    return await this.favoriteRepository.findOne({
      where: { id: favs.id },
      relations: { albums: true, artists: true, tracks: true },
    });
  }

  async findAll() {
    const favs = await this.getFavs();
    return {
      artists: favs.artists,
      albums: favs.albums,
      tracks: favs.tracks,
    };
  }

  async addFavArtist(id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException({
        message: `Artist with id ${id} doesn't exist`,
      });
    }
    const favs = await this.getFavs();
    favs.artists.push(artist);
    return await this.favoriteRepository.save(favs);
  }

  async removeFavArtist(id: string) {
    const favs = await this.getFavs();
    const indexArtist = favs.artists.findIndex((artist) => artist.id === id);
    if (indexArtist == -1) {
      throw new NotFoundException({
        message: `Artist with id ${id} is not favorite`,
      });
    }
    favs.artists.splice(indexArtist, 1);
    await this.favoriteRepository.save(favs);
  }

  async addFavTrack(id: string) {
    const track = await this.trackService.findOne(id);
    if (!track)
      throw new UnprocessableEntityException({
        message: `Track with id ${id} does not exist`,
      });

    const favs = await this.getFavs();
    favs.tracks.push(track);
    return await this.favoriteRepository.save(favs);
  }

  async removeFavTrack(id: string) {
    const favs = await this.getFavs();
    const indexTrack = favs.tracks.findIndex((track) => track.id === id);
    if (indexTrack == -1) {
      throw new NotFoundException({
        message: `Track with id ${id} is not favorite`,
      });
    }
    favs.tracks.splice(indexTrack, 1);
    await this.favoriteRepository.save(favs);
  }

  async addFavAlbum(id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException({
        message: `Album with id ${id} doesn't exist`,
      });
    }
    const favs = await this.getFavs();
    favs.albums.push(album);
    return await this.favoriteRepository.save(favs);
  }

  async removeFavAlbum(id: string) {
    const favs = await this.getFavs();
    const indexAlbum = favs.albums.findIndex((album) => album.id === id);
    if (indexAlbum == -1) {
      throw new NotFoundException({
        message: `Album with id ${id} is not favorite`,
      });
    }
    favs.albums.splice(indexAlbum, 1);
    await this.favoriteRepository.save(favs);
  }
}
