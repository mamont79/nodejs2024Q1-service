import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export class Fav {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
