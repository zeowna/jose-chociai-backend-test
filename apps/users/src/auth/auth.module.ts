import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from '@zeowna/auth/constants';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../hash/hash.module';
import { ZeownaAuthModule } from '@zeowna/auth';

@Module({
  imports: [
    UsersModule,
    HashModule,
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
