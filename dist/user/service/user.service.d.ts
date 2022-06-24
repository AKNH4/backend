import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { LoginDto } from '../dto/Login.dto';
import { LoginResponse } from '../dto/Login.response';
import { UserEntity } from '../entity/user.entity';
import { User } from '../entity/user.interface';
import { ResponseMessage } from 'src/common/';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    signUp(user: SignUpDto): Observable<LoginResponse>;
    login(dto: LoginDto): Observable<string>;
    getUserById(id: string): Observable<User>;
    findAll(): Observable<User[]>;
    deleteUser(user: User): Observable<ResponseMessage>;
    usernameExists(username: string): Observable<boolean>;
    validateUser(username: string, password: string): Observable<User>;
    changePassword(userId: string, password: string): Observable<ResponseMessage>;
    getUserData(userId: string): Observable<User>;
    makeUserResponse(user: User): User;
}
