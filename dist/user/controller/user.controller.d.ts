import { Observable } from 'rxjs';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { CreateUserDto } from '../dto/createuser.dto';
import { LoginResponse } from '../dto/Login.response';
import { ResponseMessage } from '../../common/dto/';
import { User } from '../entity/user.interface';
import { UserService } from '../service/user.service';
import { LoginDto } from '../dto/Login.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserData(user: User): Observable<User>;
    signUp(dto: CreateUserDto): Observable<LoginResponse>;
    login(dto: LoginDto): Observable<LoginResponse>;
    deleteUser(user: User): Observable<ResponseMessage>;
    changePassword(user: User, dto: ChangePasswordDto): Observable<ResponseMessage>;
    getUserById(userId: string): Observable<User>;
}
