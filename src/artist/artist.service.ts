import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IAlbum, IArtist, ITrack } from '../types/types';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artistId = uuidv4();

    const newArtist: IArtist = {
      id: artistId,
      ...createArtistDto,
    };

    const newArtistData = this.artistRepository.create(newArtist);
    return await this.artistRepository.save(newArtistData);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    return await this.artistRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistToUpdate = await this.artistRepository.findOneBy({ id });

    artistToUpdate.name = updateArtistDto.name;
    artistToUpdate.grammy = updateArtistDto.grammy;

    return await this.artistRepository.save(artistToUpdate);
  }

  async remove(id: string) {
    await this.artistRepository.delete(id);

    //   if (idFavArtistToRemove >= 0)
    //     this.db.favorites.artists.splice(idFavArtistToRemove, 1);

    //   this.db.albums.map((alb) => {
    //     const album: IAlbum = alb;
    //     if (album.artistId === id) album.artistId = null;
    //   });

    //   this.db.tracks.map((tr) => {
    //     const track: ITrack = tr;
    //     if (track.artistId === id) track.artistId = null;
    //   });

    //   this.DbArtists.splice(idArtistToRemove, 1);
  }
}
