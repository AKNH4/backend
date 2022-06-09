import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwt: JwtService) {}

  async getHello(): Promise<string> {
    return this.jwt.signAsync({ name: 'anton' });
  }
}
