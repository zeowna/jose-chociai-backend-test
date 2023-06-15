import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty()
  authorization_token: string;

  constructor(token: string) {
    this.authorization_token = token;
  }
}
