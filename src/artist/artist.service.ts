import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from '../db/db.service';
import { IArtist } from '../types/types';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  private DbArtists: Array<IArtist> = this.db.artists;

  create(createArtistDto: CreateArtistDto) {
    const artistId = uuidv4();

    const newArtist: IArtist = {
      id: artistId,
      ...createArtistDto,
    };

    this.DbArtists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.DbArtists;
  }

  findOne(id: string) {
    const artistToFind = this.DbArtists.find((artist) => artist.id === id);
    return artistToFind;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistToUpdate = this.DbArtists.find((artist) => artist.id === id);

    if (!artistToUpdate) return artistToUpdate;

    artistToUpdate.name = updateArtistDto.name;
    artistToUpdate.grammy = updateArtistDto.grammy;

    return artistToUpdate;
  }

  remove(id: string) {
    const idArtistToRemove = this.DbArtists.findIndex(
      (artist) => artist.id === id,
    );

    if (idArtistToRemove < 0) {
      throw new NotFoundException({
        message: `Can't find artist with id ${id}. Please, check your id`,
      });
    }

    this.DbArtists.splice(idArtistToRemove, 1);
  }
}
