import {
  BadRequestException,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { from, map, Observable, of } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { SignUpDto } from '../dto/signUp.dto';
import { ResponseMessage } from '../../common/dto/';
import { User } from '../entity/user.interface';
import { UserService } from '../service/user.service';
import { LoginDto } from '../dto/Login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileImageStorage } from '../helper/profileimage.storage';
import { Response } from 'express';
import { join } from 'path';

type UserId = Omit<User, 'id'>;
type UserReq = Required<User>;
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get('data')
  @UseGuards(AuthGuard)
  getUserData(
    @GetUser() user: User,
    @Query('p') property: string,
  ): Observable<User> {
    return property ? of({ [property]: user[property] }) : of(user);
  }

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto): Observable<{ token: string }> {
    return this.userService.signUp(dto).pipe(map((token) => ({ token })));
  }

  @Post('login')
  login(@Body() dto: LoginDto): Observable<{ token: string }> {
    return this.userService.login(dto).pipe(map((token) => ({ token })));
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  deleteUser(@GetUser('id') userId: string): Observable<ResponseMessage> {
    return this.userService
      .deleteUser(userId)
      .pipe(map((msg: string) => ({ msg })));
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  changePassword(
    @GetUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ): Observable<ResponseMessage> {
    return this.userService
      .changePassword(userId, dto)
      .pipe(map((msg: string) => ({ msg })));
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', ProfileImageStorage))
  uploadProfileImage(
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<ResponseMessage> {
    if (!file?.filename) throw new BadRequestException('Bild fehlt');
    return this.userService
      .updateProfileImage(userId, file?.filename)
      .pipe(map((msg: string) => ({ msg })));
  }

  @UseGuards(AuthGuard)
  @Get('image')
  profileImage(@GetUser('id') userId: string, @Res() res: Response) {
    return this.userService
      .findProfileImage(userId)
      .pipe(
        map((imagePath: string) =>
          res.sendFile(imagePath, { root: './uploads/profileimages' }),
        ),
      );
  }
}
// res.sendFile(join(process.cwd(), './uploads', imagePath));
// res.sendFile(imagePath, { root: './uploads' });
