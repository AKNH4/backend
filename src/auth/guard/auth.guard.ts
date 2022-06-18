import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { from, Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.authService.validateRequest(request);
  }
}
