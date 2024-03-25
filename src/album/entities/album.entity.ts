import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
