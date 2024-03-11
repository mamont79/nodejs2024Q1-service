import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId: string | null;
}
