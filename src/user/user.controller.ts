import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

const userWithoutPassword = (user: User) => {
  const copyOfUser = { ...user };
  delete copyOfUser.password;
  return copyOfUser;
};

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const resp = userWithoutPassword(user);
    return resp;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll() {
    const allUsers = await this.userService.findAll();
    const resp = allUsers.map((user) => userWithoutPassword(user));
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user with id' })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(`Can't find user with id:  ${id}`);
    const resp = userWithoutPassword(user);
    return resp;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user with id' })
  @ApiResponse({ status: 200, type: User })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException(`Can't find user with id:  ${id}`);
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(`Your password is wrong`);
    }

    const userToUpdate = await this.userService.update(id, updateUserDto);
    const resp = userWithoutPassword(userToUpdate);

    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with id' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException(`Can't find user with id:  ${id}`);

    return await this.userService.remove(id);
  }
}
