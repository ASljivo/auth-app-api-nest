import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtService } from './jwt/jwt.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService extends JwtService {
  constructor(
    private userService: UserService,
    public nestJwtService: NestJwtService,
    public config: ConfigService,
  ) {
    super(nestJwtService, config);
  }

  async login({ email, password }: LoginDto) {
    const [user] = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  refreshToken(user: UserDto) {
    return {};
  }

  async logout(response: Response) {
    this.deleteTokenCookie(response, this.config.get<string>('ACCESS_TOKEN'));
    this.deleteTokenCookie(response, this.config.get<string>('REFRESH_TOKEN'));
    return response;
  }
}
