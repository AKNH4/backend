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

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token missing');

    const decoded = await this.authService.validateJwt(token);

    if (!decoded) throw new UnauthorizedException('Token no longer valid');

    request.user = { ...decoded, exp: undefined, iat: undefined };

    return request;
  }
}
