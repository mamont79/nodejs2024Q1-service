import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import { IUser } from '../types/types';

const userWithoutPassword = (user: IUser) => {
  const copyOfUser = { ...user };
  delete copyOfUser.password;
  return copyOfUser;
};

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  private DbUsers: Array<IUser> = this.db.users;

  create(createUserDto: CreateUserDto) {
    const userId = uuidv4();
    const newUser: IUser = {
      id: userId,
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.DbUsers.push(newUser);

    const userResp = userWithoutPassword(newUser);
    return userResp;
  }

  findAll() {
    const allUsers = this.DbUsers.map((user) => {
      return userWithoutPassword(user);
    });

    return allUsers;
  }

  findOne(id: string) {
    const userToFind = this.DbUsers.find((user) => user.id === id);
    if (!userToFind) return userToFind;
    return userWithoutPassword(userToFind);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const userToUpdate = this.DbUsers.find((user) => user.id === id);

    if (!userToUpdate) return userToUpdate;
    if (userToUpdate.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(
        `You must enter correct password to update user`,
      );
    }

    userToUpdate.version += 1;
    userToUpdate.password = updateUserDto.newPassword;
    userToUpdate.updatedAt = Date.now();

    const userResp = userWithoutPassword(userToUpdate);

    return userResp;
  }

  remove(id: string) {
    const idUserToRemove = this.DbUsers.findIndex((user) => user.id === id);

    if (idUserToRemove < 0) {
      throw new NotFoundException({
        message: `Can't find user with id ${id}. Please, check your id`,
      });
    }

    this.DbUsers.splice(idUserToRemove, 1);
  }
}
