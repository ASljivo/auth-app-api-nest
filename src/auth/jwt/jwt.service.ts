import { HttpStatus, Injectable } from '@nestjs/common';

import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class JwtService {
  constructor(
    public nestJwtService: NestJwtService,
    public config: ConfigService,
  ) {}

  protected async createToken(
    email: string,
    tokenExpiration: string,
    secretKey: string,
  ) {
    const payload = {
      sub: email,
    };

    return await this.nestJwtService.signAsync(payload, {
      expiresIn: `${tokenExpiration}s`,
      secret: secretKey,
      algorithm: 'HS512',
    });
  }

  public async createAccessToken(email: string) {
    return await this.createToken(
      email,
      this.config.get<string>('ACCESS_TOKEN_EXPIRATION_IN_MS'),
      this.config.get<string>('ACCESS_TOKEN_SECRET'),
    );
  }

  public async createRefreshToken(email: string) {
    return await this.createToken(
      email,
      this.config.get<string>('REFRESH_TOKEN_EXPIRATION_IN_MS'),
      this.config.get<string>('REFRESH_TOKEN_SECRET'),
    );
  }

  public async createJwtResponseHeaders(response: Response, email: string) {
    const accessToken = await this.createAccessToken(email);
    const refreshToken = await this.createRefreshToken(email);

    return response
      .cookie(this.config.get<string>('ACCESS_TOKEN'), accessToken, {
        maxAge: Number(
          this.config.get<string>('ACCESS_COOKIE_EXPIRATION_IN_MS'),
        ),
        httpOnly: Boolean(this.config.get<string>('ACCESS_COOKIE_HTTP_ONLY')),
        secure: Boolean(this.config.get<string>('ACCESS_COOKIE_SECURE')),
        path: '/',
      })
      .cookie(this.config.get<string>('REFRESH_TOKEN'), refreshToken, {
        maxAge: Number(
          this.config.get<string>('REFRESH_TOKEN_EXPIRATION_IN_MS'),
        ),
        httpOnly: Boolean(this.config.get<string>('REFRESH_COOKIE_HTTP_ONLY')),
        secure: Boolean(this.config.get<string>('REFRESH_COOKIE_SECURE')),
        path: '/',
      })
      .status(HttpStatus.OK);
  }

  public deleteTokenCookie(response: Response, tokenName: string) {
    return response.clearCookie(tokenName, {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      path: '/',
    });
  }
}
