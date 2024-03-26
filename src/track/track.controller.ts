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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: 201, type: Track })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track with id' })
  @ApiResponse({ status: 200, type: Track })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException(`Can't find track with id:  ${id}`);
    return track;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track with id' })
  @ApiResponse({ status: 200, type: Track })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const trackToUpdate = await this.trackService.findOne(id);

    if (!trackToUpdate)
      throw new NotFoundException(`Can't find track with id:  ${id}`);

    const track = await this.trackService.update(id, updateTrackDto);
    return track;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track with id' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const trackToRemove = await this.trackService.findOne(id);

    if (!trackToRemove)
      throw new NotFoundException(`Can't find track with id:  ${id}`);

    return await this.trackService.remove(id);
  }
}
