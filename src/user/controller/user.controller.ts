import { HttpCode, ParseUUIDPipe } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { from, map, Observable, of } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { ChangeUsernameDto } from '../dto/changeUsername.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { LoginResponse } from '../dto/Login.response';
import { ResponseMessage } from '../../common/dto/';
import { User } from '../entity/user.interface';
import { UserService } from '../service/user.service';
import { LoginDto } from '../dto/Login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/data')
  @UseGuards(AuthGuard)
  getUserData(@GetUser() user: User): Observable<User> {
    return of(user);
  }

  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto): Observable<LoginResponse> {
    return this.userService.signUp(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Observable<{ token: string }> {
    return this.userService.login(dto).pipe(map((token) => ({ token })));
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  deleteUser(@GetUser() user: User): Observable<ResponseMessage> {
    return this.userService.deleteUser(user);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  changePassword(
    @GetUser() user: User,
    @Body() dto: ChangePasswordDto,
  ): Observable<ResponseMessage> {
    return this.userService.changePassword(user.id, dto.password);
  }
}
