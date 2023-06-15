import { DynamicModule, Module } from '@nestjs/common';
import { AuthGuard } from '@zeowna/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@Module({})
export class ZeownaAuthModule {
  static register(options: JwtModuleOptions): DynamicModule {
    return {
      module: ZeownaAuthModule,
      imports: [JwtModule.register(options)],
      providers: [AuthGuard],
      exports: [AuthGuard],
    };
  }
}
