import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
export declare class AuthService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<UserEntity>);
    generateJWT(payload: Object): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePasswords(password: string, storedPassword: string): Observable<any>;
    validateJwt(jwt: string): Promise<Object>;
}
