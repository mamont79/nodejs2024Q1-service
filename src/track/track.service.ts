import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from '../db/db.service';
import { ITrack } from '../types/types';

@Injectable()
export class TrackService {
  constructor(private readonly db: DbService) {}

  private DbTracks: Array<ITrack> = this.db.tracks;

  create(createTrackDto: CreateTrackDto) {
    const trackId = uuidv4();

    const newTrack: ITrack = {
      id: trackId,
      ...createTrackDto,
    };

    this.DbTracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.DbTracks;
  }

  findOne(id: string) {
    const trackToFind = this.DbTracks.find((track) => track.id === id);
    return trackToFind;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackToUpdate = this.DbTracks.find((track) => track.id === id);

    if (!trackToUpdate) return trackToUpdate;

    trackToUpdate.name = updateTrackDto.name;
    trackToUpdate.artistId = updateTrackDto.artistId;
    trackToUpdate.albumId = updateTrackDto.albumId;
    trackToUpdate.duration = updateTrackDto.duration;

    return trackToUpdate;
  }

  remove(id: string) {
    const idTreckToRemove = this.DbTracks.findIndex((track) => track.id === id);
    const idFavTrackToRemove = this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (idTreckToRemove < 0) {
      throw new NotFoundException({
        message: `Can't find track with id ${id}. Please, check your id`,
      });
    }
    if (idFavTrackToRemove >= 0)
      this.db.favorites.tracks.splice(idFavTrackToRemove, 1);

    this.DbTracks.splice(idTreckToRemove, 1);
  }
}
