import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { promisify } from 'util';
import { UserResponseBody } from './responses/user-response-body';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findById(id: string) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async create(dto: UserDto) {
    const { email } = dto;
    const users = await this.repo.find({
      where: {
        email,
      },
    });
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(dto.password, salt, 32)) as Buffer;

    const password = salt + '.' + hash.toString('hex');

    const user = { ...dto, password };

    return this.repo.save(user);
  }

  async mapUserResponse(user: UserDto) {
    const mappedUser: UserResponseBody = {
      ...user,
      isVerified: true, // return from email service
    };
    return mappedUser;
  }

  async findMe() {
    const id = '1';
    return this.findById(id);
  }

  async update(attrs: Partial<User>) {
    const id = ' 1';
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async delete() {
    const id = '1';
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.repo.remove(user);
  }
}
