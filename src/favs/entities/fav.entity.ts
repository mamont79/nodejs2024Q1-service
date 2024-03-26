import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fav {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [Artist] })
  @ManyToMany(() => Artist, (artist) => artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  @ManyToMany(() => Album, (album) => album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ApiProperty({ type: [Track] })
  @ManyToMany(() => Track, (track) => track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
