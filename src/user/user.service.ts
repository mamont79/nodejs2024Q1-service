import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IUser } from '../types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userId = uuidv4();
    const newUser: IUser = {
      id: userId,
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const createdUser = this.usersRepository.create(newUser);
    return await this.usersRepository.save(createdUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const userToUpdate = await this.usersRepository.findOneBy({ id });

    userToUpdate.version += 1;
    userToUpdate.password = updateUserDto.newPassword;
    userToUpdate.updatedAt = Date.now();
    userToUpdate.createdAt = Number(userToUpdate.createdAt);

    return await this.usersRepository.save(userToUpdate);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
