import { Injectable } from '@nestjs/common';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export abstract class AbstractAuthService {
  constructor(private readonly jwtServiceImpl: JwtService) {}

  protected async encode(
    payload: string | Buffer | object,
    options?: JwtSignOptions,
  ) {
    return this.jwtServiceImpl.signAsync(payload, options);
  }
}
