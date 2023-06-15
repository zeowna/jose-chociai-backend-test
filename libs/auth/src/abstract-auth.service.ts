import { Injectable } from '@nestjs/common';
import { HashServiceInterface } from './hash/hash-service.interface';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export abstract class AbstractAuthService {
  constructor(
    private readonly jwtServiceImpl: JwtService,
    private readonly hashServiceImpl: HashServiceInterface,
  ) {}

  protected async encode(
    payload: string | Buffer | object,
    options?: JwtSignOptions,
  ) {
    return this.jwtServiceImpl.signAsync(payload, options);
  }
}
