import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignInResponse } from './types/sign-in.response';
import { CustomRequest } from '@zeowna/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: SignInResponse })
  @Post()
  signIn(@Req() request: CustomRequest, @Body() signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      request.correlationId,
    );
  }
}
