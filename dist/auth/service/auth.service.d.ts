import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { User } from '../../user/entity/user.interface';
export declare class AuthService {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<UserEntity>);
    generateJWT(sub: string): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePasswords(password: string, storedPassword: string): Observable<boolean>;
    validateUser(username: string, password: string): Observable<User>;
    validateRequest(request: Request): Observable<boolean>;
}
