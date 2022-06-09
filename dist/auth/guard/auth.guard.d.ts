import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
export default class AuthGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
