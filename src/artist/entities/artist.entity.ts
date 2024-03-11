import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}
