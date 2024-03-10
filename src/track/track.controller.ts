import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { User } from 'src/user/entities/user.entity';
import { Track } from './entities/track.entity';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiResponse({ status: 201, type: Track })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track with id' })
  @ApiResponse({ status: 200, type: Track })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException(`Can't find track with id:  ${id}`);
    return track;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track with id' })
  @ApiResponse({ status: 200, type: Track })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.trackService.update(id, updateTrackDto);
    if (!track) throw new NotFoundException(`Can't find track with id:  ${id}`);
    return track;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track with id' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.remove(id);
  }
}
