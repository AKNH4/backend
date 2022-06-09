import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { CreateUserDto } from '../dto/createuser.dto';
import { LoginDto } from '../dto/Login.dto';
import { LoginResponse } from '../dto/Login.response';
import { UserEntity } from '../entity/user.entity';
import { User } from '../entity/user.interface';
import { PostEntity } from '../../post/entity/post.entity';
import { IPost } from '../../post/entity/post.interface';
import { CommentEntity } from '../../comment/entity/comment.entity';
import { Comment } from '../../comment/entity/comment.interface';
import { ResponseMessage } from 'src/common/';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  signUp(user: CreateUserDto): Observable<LoginResponse> {
    user.username = user.username.toLowerCase();
    return this.usernameExists(user.username).pipe(
      switchMap((exists: boolean) => {
        if (!exists)
          return this.authService.hashPassword(user.password).pipe(
            switchMap((hash: string) => {
              return from(
                this.userRepository.save({
                  username: user.username,
                  password: hash,
                }),
              ).pipe(
                switchMap((newUser: User) => {
                  return this.authService.generateJWT(newUser).pipe(
                    map((token: string) => {
                      return {
                        token: token,
                        user: this.makeUserResponse(newUser),
                      };
                    }),
                  );
                }),
              );
            }),
          );
        throw new BadRequestException('Benutzername gibts schon!');
      }),
    );
  }

  getUserById(id: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { id } })).pipe(
      map((user: User) => {
        if (!user) throw new NotFoundException('Benutzer gibts nich!!');

        return this.makeUserResponse(user);
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
      map((res: DeleteResult) => {
        return { msg: 'Benutzer gelöscht!' };
      }),
      catchError((err: any) => {
        throw new InternalServerErrorException('Failed!!!');
      }),
    );
  }

  usernameExists(username: string): Observable<boolean> {
    username = username.toLowerCase();
    return from(this.userRepository.findOne({ where: { username } })).pipe(
      map((user: User) => {
        if (user) return true;
        return false;
      }),
    );
  }

  login(dto: LoginDto): Observable<LoginResponse> {
    return this.validateUser(dto.username, dto.password).pipe(
      switchMap((user: User) => {
        if (user)
          return this.authService.generateJWT(user).pipe(
            map((token: string) => {
              return { token, user };
            }),
          );
        throw new UnauthorizedException('Falche Logindaten');
      }),
    );
  }

  validateUser(username: string, password: string): Observable<User> {
    username = username.toLowerCase();
    return this.usernameExists(username).pipe(
      switchMap((exists: boolean) => {
        if (exists)
          return from(
            this.userRepository.findOne({ where: { username } }),
          ).pipe(
            switchMap((user: User) => {
              return this.authService
                .comparePasswords(password, user.password)
                .pipe(
                  map((match: boolean) => {
                    if (match) return this.makeUserResponse(user);
                    throw new BadRequestException('Falche Logindaten');
                  }),
                );
            }),
          );
        throw new BadRequestException('Falche Logindaten');
      }),
    );
  }

  // changeUsername(
  //   userId: string,
  //   username: string,
  // ): Observable<ResponseMessage> {
  //   username = username.toLowerCase();
  //   return from(this.userRepository.findOne({ where: { id: userId } })).pipe(
  //     switchMap((user: User) => {
  //       if (user.username === username) throw new BadRequestException();
  //       return from(this.usernameExists(username)).pipe(
  //         switchMap((exists: boolean) => {
  //           if (exists)
  //             throw new BadRequestException("Benutzername gibt's schon");
  //           return from(
  //             this.userRepository.update({ id: userId }, { username }),
  //           ).pipe(
  //             switchMap(() => {
  //               return from(
  //                 this.commentRepository.find({ where: { creator: user } }),
  //               ).pipe(
  //                 map((comments: Comment[]) => {
  //                   console.table(comments);
  //                   comments.forEach(async (comment: Comment) => {
  //                     return await this.postRepository.update(
  //                       { id: comment.id },
  //                       { creator_name: username },
  //                     );
  //                   });
  //                 }),
  //               );
  //             }),
  //             switchMap(() => {
  //               return from(
  //                 this.postRepository.find({ where: { creator: user } }),
  //               ).pipe(
  //                 map((posts: IPost[]) => {
  //                   posts.forEach(async (post: IPost) => {
  //                     return await this.postRepository.update(
  //                       { id: post.id },
  //                       { creator_name: username },
  //                     );
  //                   });
  //                   return { msg: 'Benutzername geändert!' };
  //                 }),
  //               );
  //             }),
  //           );
  //         }),
  //       );
  //     }),
  //   );
  // }

  changePassword(
    userId: string,
    password: string,
  ): Observable<ResponseMessage> {
    return from(this.userRepository.findOne({ where: { id: userId } })).pipe(
      switchMap((user: User) => {
        if (!user)
          throw new BadRequestException("Benutzer mit der id gibt's nicht");
        return from(this.authService.hashPassword(password)).pipe(
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

  getUserData(userId: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { id: userId } })).pipe(
      map((user: User) => {
        const { password, ...res } = user;
        return res;
      }),
    );
  }

  makeUserResponse(user: User): User {
    const { password, ...res } = user;
    return res;
  }
}
