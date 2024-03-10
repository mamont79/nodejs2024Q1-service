import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user with id' })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Can't find user with id:  ${id}`);
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user with id' })
  @ApiResponse({ status: 200, type: User })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = this.userService.update(id, updateUserDto);
    if (!user) throw new NotFoundException(`Can't find user with id:  ${id}`);
    return user;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with id' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.remove(id);
  }
}
