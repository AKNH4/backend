import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { LoginDto } from '../dto/Login.dto';
import { UserEntity } from '../entity/user.entity';
import { User } from '../entity/user.interface';
import { ResponseMessage } from 'src/common/';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    signUp(dto: SignUpDto): Observable<string>;
    login(dto: LoginDto): Observable<string>;
    findAll(): Observable<User[]>;
    deleteUser(user: User): Observable<ResponseMessage>;
    changePassword(userId: string, password: string): Observable<ResponseMessage>;
}
