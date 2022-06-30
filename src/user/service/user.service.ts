import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
import { ResponseMessage } from 'src/common/';
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
          switchMap((passwordHash) => {
            return from(
              this.userRepository.save({
                username,
                password: passwordHash,
              }),
            ).pipe(
              switchMap((newUser: User) =>
                this.authService.generateJWT(newUser.id),
              ),
            );
          }),
        );
      }),
    );
  }

  login(dto: LoginDto): Observable<string> {
    dto.username = dto.username.toLowerCase();
    const { username, password } = dto;

    return from(this.userRepository.findOne({ where: { username } })).pipe(
      switchMap((user: User) => {
        if (!user) throw new UnauthorizedException('Logindaten falsch');
        return this.authService.comparePasswords(password, user.password).pipe(
          switchMap((match: boolean) => {
            if (!match) throw new UnauthorizedException('Logindaten falsch');
            return this.authService.generateJWT(user.id);
          }),
        );
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  deleteUser(user: User): Observable<ResponseMessage> {
    return from(this.userRepository.delete(user.id)).pipe(
      map(() => {
        return { msg: 'Benutzer gelöscht!' };
      }),
      catchError((err: any) => {
        throw new InternalServerErrorException('Failed!!!');
      }),
    );
  }

  changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ): Observable<ResponseMessage> {
    return from(this.userRepository.findOne({ where: { id: userId } })).pipe(
      switchMap((user: User) => {
        if (!user)
          throw new BadRequestException("Benutzer mit der id gibt's nicht");
        return from(this.authService.hashPassword(dto.password)).pipe(
          switchMap((hash: string) => {
            return from(
              this.userRepository.update({ id: userId }, { password: hash }),
            ).pipe(
              map((res: UpdateResult) => {
                if (!res) throw new InternalServerErrorException('OOps');
                return { msg: 'Passwort geändert!' };
              }),
            );
          }),
        );
      }),
    );
  }
}
