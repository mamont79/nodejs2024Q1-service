import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist
}
