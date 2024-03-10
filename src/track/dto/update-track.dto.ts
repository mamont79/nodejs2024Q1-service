import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  artistId: string | null;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  duration: number;
}
