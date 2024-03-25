import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from '../db/db.service';
import { ITrack } from '../types/types';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const trackId = uuidv4();

    const newTrack: ITrack = {
      id: trackId,
      ...createTrackDto,
    };

    const newTrackData = this.trackRepository.create(newTrack);
    return await this.trackRepository.save(newTrackData);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    return await this.trackRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackToUpdate = await this.trackRepository.findOneBy({ id });

    trackToUpdate.name = updateTrackDto.name;
    trackToUpdate.artistId = updateTrackDto.artistId;
    trackToUpdate.albumId = updateTrackDto.albumId;
    trackToUpdate.duration = updateTrackDto.duration;

    return await this.trackRepository.save(trackToUpdate);
  }

  async remove(id: string) {
    await this.trackRepository.delete(id);
  }
}
