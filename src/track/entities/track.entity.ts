import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId: string | null;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  albumId: string | null;

  @ApiProperty()
  duration: number;
}
