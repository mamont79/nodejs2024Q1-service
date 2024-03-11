import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from '../db/db.service';
import { IAlbum, ITrack } from '../types/types';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  private DbAlbums: Array<IAlbum> = this.db.albums;

  create(createAlbumDto: CreateAlbumDto) {
    const albumId = uuidv4();

    const newAlbum: IAlbum = {
      id: albumId,
      ...createAlbumDto,
    };

    this.DbAlbums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.DbAlbums;
  }

  findOne(id: string) {
    const albumToFind = this.DbAlbums.find((album) => album.id === id);
    return albumToFind;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = this.DbAlbums.find((album) => album.id === id);

    if (!albumToUpdate) return albumToUpdate;

    albumToUpdate.name = updateAlbumDto.name;
    albumToUpdate.year = updateAlbumDto.year;
    albumToUpdate.artistId = updateAlbumDto.artistId;

    return albumToUpdate;
  }

  remove(id: string) {
    const idAlbumToRemove = this.DbAlbums.findIndex((album) => album.id === id);
    const idFavAlbumToRemove = this.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (idAlbumToRemove < 0) {
      throw new NotFoundException({
        message: `Can't find album with id ${id}. Please, check album id`,
      });
    }
    if (idFavAlbumToRemove >= 0)
      this.db.favorites.albums.splice(idFavAlbumToRemove, 1);

    this.db.tracks.map((tr) => {
      const track: ITrack = tr;
      if (track.albumId === id) track.albumId = null;
    });

    this.DbAlbums.splice(idAlbumToRemove, 1);
  }
}
