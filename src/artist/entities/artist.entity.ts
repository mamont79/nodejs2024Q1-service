import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Artist {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums?: Album[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks?: Track[];
}
