import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { Fav } from './entities/fav.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

@Controller('favs')
@ApiTags('Favourites')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favourites' })
  @ApiResponse({ status: 200, type: Fav })
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favourites' })
  @ApiResponse({ status: 201, type: Artist })
  @ApiUnprocessableEntityResponse({
    description: `Artist with such id doesn't exist`,
  })
  async addFavArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.addFavArtist(id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Remove artist from favourites' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async removeFavArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.removeFavArtist(id);
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favourites' })
  @ApiResponse({ status: 201, type: Track })
  @ApiUnprocessableEntityResponse({
    description: `Track with such id doesn't exist`,
  })
  async addFavTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.addFavTrack(id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Remove track from favourites' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async removeFavTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.removeFavTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favourites' })
  @ApiResponse({ status: 201, type: Album })
  @ApiUnprocessableEntityResponse({
    description: `Album with such id doesn't exist`,
  })
  async addFavAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.addFavAlbum(id);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Remove album from favourites' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async removeFavAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favsService.removeFavAlbum(id);
  }
}
