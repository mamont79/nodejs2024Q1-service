import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const albumId = uuidv4();

    const newAlbum: Album = {
      id: albumId,
      ...createAlbumDto,
    };

    const newAlbumData = this.albumRepository.create(newAlbum);
    return await this.albumRepository.save(newAlbumData);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    return await this.albumRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = await this.albumRepository.findOneBy({ id });

    albumToUpdate.name = updateAlbumDto.name;
    albumToUpdate.year = updateAlbumDto.year;
    albumToUpdate.artistId = updateAlbumDto.artistId;

    return await this.albumRepository.save(albumToUpdate);
  }

  async remove(id: string) {
    await this.albumRepository.delete(id);
  }
}
