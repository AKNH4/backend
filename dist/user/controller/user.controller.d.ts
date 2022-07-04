/// <reference types="multer" />
import { Observable } from 'rxjs';
import { ChangePasswordDto } from '../dto/changePassword.dto';
import { SignUpDto } from '../dto/signUp.dto';
import { ResponseMessage } from '../../common/dto/';
import { User } from '../entity/user.interface';
import { UserService } from '../service/user.service';
import { LoginDto } from '../dto/Login.dto';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Observable<User[]>;
    getUserData(user: User, property: string): Observable<User>;
    signUp(dto: SignUpDto): Observable<{
        token: string;
    }>;
    login(dto: LoginDto): Observable<{
        token: string;
    }>;
    deleteUser(userId: string): Observable<ResponseMessage>;
    changePassword(userId: string, dto: ChangePasswordDto): Observable<ResponseMessage>;
    uploadProfileImage(userId: string, file: Express.Multer.File): Observable<ResponseMessage>;
    profileImage(userId: string, res: Response): Observable<void>;
}
