import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Track {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;

  @ApiProperty()
  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist?: Artist;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album?: Album;
}
