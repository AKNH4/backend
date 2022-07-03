import { HttpCode, Param, ParseUUIDPipe, Query } from '@nestjs/common';
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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAll();
  }

  @Get('/data')
  @UseGuards(AuthGuard)
  getUserData(
    @GetUser() user: User,
    @Query('p') property: string,
  ): Observable<User> {
    return property ? of({ [property]: user[property] }) : of(user);
  }

  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto): Observable<{ token: string }> {
    return this.userService.signUp(dto).pipe(map((token) => ({ token })));
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Observable<{ token: string }> {
    return this.userService.login(dto).pipe(map((token) => ({ token })));
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  deleteUser(@GetUser('id') userId: string): Observable<ResponseMessage> {
    return this.userService
      .deleteUser(userId)
      .pipe(map((msg: string) => ({ msg })));
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  changePassword(
    @GetUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ): Observable<ResponseMessage> {
    return this.userService
      .changePassword(userId, dto)
      .pipe(map((msg: string) => ({ msg })));
  }
}
