import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/service/auth.service';
import { SignUpDto } from '../dto/signUp.dto';
import { LoginDto } from '../dto/Login.dto';
import { UserEntity } from '../entity/user.entity';
import { User } from '../entity/user.interface';
import { ChangePasswordDto } from '../dto/changePassword.dto';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    findAll(): Observable<User[]>;
    signUp(dto: SignUpDto): Observable<string>;
    login(dto: LoginDto): Observable<string>;
    deleteUser(userId: string): Observable<string>;
    changePassword(id: string, dto: Readonly<ChangePasswordDto>): Observable<string>;
    updateProfileImage(id: string, imagePath: string): Observable<string>;
    findProfileImage(id: string): Observable<string>;
}
