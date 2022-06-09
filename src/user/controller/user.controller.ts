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
import { map, Observable } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { ChangeUsernameDto } from '../dto/changeUsername.dto';
import { CreateUserDto } from '../dto/createuser.dto';
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
    return this.userService.getUserData(user.id);
  }

  @Post('/sign-up')
  signUp(@Body() dto: CreateUserDto): Observable<LoginResponse> {
    return this.userService.signUp(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Observable<LoginResponse> {
    return this.userService.login(dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete')
  deleteUser(@GetUser() user: User): Observable<ResponseMessage> {
    return this.userService.deleteUser(user);
  }

  // @UseGuards(AuthGuard)
  // @Post('/change-username')
  // changeUsername(
  //   @GetUser() user: User,
  //   @Body() dto: ChangeUsernameDto,
  // ): Observable<ResponseMessage> {
  //   return this.userService.changeUsername(user.id, dto.username);
  // }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  changePassword(
    @GetUser() user: User,
    @Body() dto: ChangePasswordDto,
  ): Observable<ResponseMessage> {
    return this.userService.changePassword(user.id, dto.password);
  }

  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }
}
