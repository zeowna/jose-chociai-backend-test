import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { BcryptHashService } from '../hash/bcrypt-hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: BcryptHashService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    console.log({ user });

    const isEqual = await this.hashService.comparePasswords(
      user.password,
      password,
    );

    if (!isEqual) {
      throw new UnauthorizedException("User password doesn't match");
    }

    const signed = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.email,
        companyId: user?.company?._id,
      },
      { secret: jwtConstants.secret },
    );

    return {
      authorization_token: signed,
    };
  }
}
