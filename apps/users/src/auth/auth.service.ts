import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@zeowna/auth/constants';
import { BcryptHashService } from '../hash/bcrypt-hash.service';
import { AbstractAuthService } from '@zeowna/auth';
import { DecodedJwt } from '@zeowna/common';
import { SignInResponse } from './types/sign-in.response';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class AuthService extends AbstractAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: BcryptHashService,
    private readonly logger: NestLoggerService,
  ) {
    super(jwtService);
  }

  async signIn(email: string, password: string, correlationId: string) {
    this.logger.info('AuthService.signIn()', {
      email,
      password: password ? '<deleted>' : undefined,
      correlationId,
    });
    const user = await this.usersService.findByEmail(email, correlationId);

    const isEqual = await this.hashService.comparePasswords(
      user.password,
      password,
    );

    if (!isEqual) {
      throw new UnauthorizedException("User password doesn't match");
    }

    const signed = await this.encode(
      {
        sub: user.id,
        username: user.email,
        companyId: user?.company?.id,
      } as DecodedJwt,
      { secret: jwtConstants.secret },
    );

    return new SignInResponse(signed);
  }
}
