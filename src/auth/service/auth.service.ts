import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { from, map, Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { User } from '../../user/entity/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  generateJWT(payload: Object): Observable<string> {
    return from(this.jwtService.signAsync({ ...payload }));
  }

  hashPassword(password: string): Observable<string> {
    return from(hash(password, 12));
  }

  comparePasswords(password: string, storedPassword: string): Observable<any> {
    return from(compare(password, storedPassword));
  }

  async validateJwt(jwt: string): Promise<Object> {
    try {
      const decoded = await this.jwtService.verify(jwt);
      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
      if (!user) return false;
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
