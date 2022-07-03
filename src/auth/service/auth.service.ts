import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Request } from 'express';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
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

  generateJWT(sub: string): Observable<string> {
    return from(this.jwtService.signAsync({ sub }));
  }

  hashPassword(password: string): Observable<string> {
    return from(hash(password, 12));
  }

  comparePasswords(
    password: string,
    storedPassword: string,
  ): Observable<boolean> {
    return from(compare(password, storedPassword));
  }

  validateUser(username: string, password: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { username } })).pipe(
      switchMap((user: User) =>
        this.comparePasswords(password, user.password).pipe(
          map((passwordMatch: boolean) => {
            if (passwordMatch) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
    );
  }

  validateRequest(request: Request): Observable<boolean> {
    const token: string = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');
    return from(this.jwtService.verifyAsync(token)).pipe(
      switchMap((decoded: any) => {
        return from(
          this.userRepository.findOne({ where: { id: decoded.sub } }),
        ).pipe(
          map((user: User) => {
            if (!user) throw new UnauthorizedException('Token no longer valid');
            delete user.password;
            request.user = user;
            return true;
          }),
        );
      }),
      catchError(() => {
        throw new UnauthorizedException('Token invalid');
      }),
    );
  }
}
