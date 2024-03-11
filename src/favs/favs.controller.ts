import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
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
  findAll() {
    return this.favsService.findAll();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favourites' })
  @ApiResponse({ status: 201, type: Artist })
  @ApiUnprocessableEntityResponse({
    description: `Artist with such id doesn't exist`,
  })
  addFavArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addFavArtist(id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Remove artist from favourites' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  removeFavArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favsService.removeFavArtist(id);
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favourites' })
  @ApiResponse({ status: 201, type: Track })
  @ApiUnprocessableEntityResponse({
    description: `Track with such id doesn't exist`,
  })
  addFavTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addFavTrack(id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Remove track from favourites' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  removeFavTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeFavTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favourites' })
  @ApiResponse({ status: 201, type: Album })
  @ApiUnprocessableEntityResponse({
    description: `Album with such id doesn't exist`,
  })
  addFavAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addFavAlbum(id);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Remove album from favourites' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  removeFavAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeFavAlbum(id);
  }
}
