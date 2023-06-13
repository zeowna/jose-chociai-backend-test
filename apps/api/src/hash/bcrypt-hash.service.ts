import { Injectable } from '@nestjs/common';
import { HashServiceInterface } from '@zeowna/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashService implements HashServiceInterface {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(storedPassword: string, userPassword: string) {
    return await bcrypt.compare(userPassword, storedPassword);
  }
}
