import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.mapUserResponse(
      await this.userService.create(dto),
    );

    (
      await this.authService.createJwtResponseHeaders(response, user.email)
    ).send(user);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.mapUserResponse(
      await this.authService.login(dto),
    );

    (
      await this.authService.createJwtResponseHeaders(response, user.email)
    ).send(user);
  }

  @Post('refresh')
  async refreshToken(@Res({ passthrough: true }) response: Response) {
    (
      await this.authService.createJwtResponseHeaders(response, 'user.email')
    ).send(null);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);

    response.send(null);
  }
}
