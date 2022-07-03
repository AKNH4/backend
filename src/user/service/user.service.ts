import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { SignUpDto } from '../dto/signUp.dto';
import { LoginDto } from '../dto/Login.dto';
import { UserEntity } from '../entity/user.entity';
import { User } from '../entity/user.interface';
import { ChangePasswordDto } from '../dto/changePassword.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  signUp(dto: SignUpDto): Observable<string> {
    dto.username = dto.username.toLowerCase();
    const { username, password } = dto;

    return from(this.userRepository.findOne({ where: { username } })).pipe(
      switchMap((user: User) => {
        if (user) throw new BadRequestException('Benutzername gibt es schon');
        return this.authService.hashPassword(password).pipe(
          switchMap((passwordHash) =>
            from(
              this.userRepository.save({
                username,
                password: passwordHash,
              }),
            ).pipe(
              switchMap((newUser: User) =>
                this.authService.generateJWT(newUser.id),
              ),
            ),
          ),
        );
      }),
    );
  }

  login(dto: LoginDto): Observable<string> {
    dto.username = dto.username.toLowerCase();
    const { username, password } = dto;

    return this.authService.validateUser(username, password).pipe(
      switchMap((user: User) => {
        if (!user) throw new UnauthorizedException('Logindaten falsch');
        return this.authService
          .generateJWT(user.id)
          .pipe(map((token: string) => token));
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) =>
        users.map((user: User) => {
          delete user.password;
          return user;
        }),
      ),
    );
  }

  deleteUser(userId: string): Observable<string> {
    return from(this.userRepository.delete(userId)).pipe(
      map(() => 'Benutzer gelöscht!'),
    );
  }

  changePassword(
    userId: string,
    dto: Readonly<ChangePasswordDto>,
  ): Observable<string> {
    const { password } = dto;
    return this.authService
      .hashPassword(password)
      .pipe(
        switchMap((passwordHash: string) =>
          from(
            this.userRepository.update(
              { id: userId },
              { password: passwordHash },
            ),
          ).pipe(map(() => 'Passwort geändert')),
        ),
      );
  }
}
