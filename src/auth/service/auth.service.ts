import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Request } from 'express';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { UserService } from 'src/user/service/user.service';
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

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ sub: user.id }));
  }

  hashPassword(password: string): Observable<string> {
    return from(hash(password, 12));
  }

  comparePasswords(password: string, storedPassword: string): Observable<any> {
    return from(compare(password, storedPassword));
  }

  validateRequest(request: Request): Observable<boolean> {
    const token: string = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token missing');

    return from(this.jwtService.verifyAsync(token)).pipe(
      switchMap((decoded: any) => {
        return from(
          this.userRepository.findOne({
            where: {
              id: decoded.sub,
            },
          }),
        ).pipe(
          map((user: User) => {
            if (!user) return false;
            delete user.password;
            request.user = user;
            return true;
          }),
        );
      }),
      catchError((err: any) => {
        throw new UnauthorizedException('Token invalid');
      }),
    );
  }
}
