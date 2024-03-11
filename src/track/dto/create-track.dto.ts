import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
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
