import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiResponse({ status: 201, type: Artist })
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, type: [Artist] })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track with id' })
  @ApiResponse({ status: 200, type: Artist })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist)
      throw new NotFoundException(`Can't find artist with id:  ${id}`);
    return artist;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist with id' })
  @ApiResponse({ status: 200, type: Artist })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artistToUpdate = await this.artistService.findOne(id);

    if (!artistToUpdate)
      throw new NotFoundException(`Can't find artist with id:  ${id}`);

    const artist = await this.artistService.update(id, updateArtistDto);
    return artist;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist with id' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artistToRemove = await this.artistService.findOne(id);

    if (!artistToRemove)
      throw new NotFoundException(`Can't find artist with id:  ${id}`);

    return await this.artistService.remove(id);
  }
}
