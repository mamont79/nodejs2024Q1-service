import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

export class Album {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist?: Artist;

  @OneToMany(() => Track, (track) => track.albumId)
  tracks?: Track[];
}
