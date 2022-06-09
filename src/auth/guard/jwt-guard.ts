// import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { compareSync } from 'bcrypt';
// import { decode } from 'jsonwebtoken';
// import { AuthService } from '../service/auth.service';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor() {
//     super({});
//   }
//   //   }
//   //   handleRequest<none = any>(
//   //     err: any,
//   //     user: any,
//   //     info: any,
//   //     context: ExecutionContext,
//   //     status?: any,
//   //   ): any {
//   //     const req = context.switchToHttp().getRequest();
//   //     console.log(req.headers.authorization.split(' ')[1]);
//   //     const token = decode(req.headers.authorization.split(' ')[1]);
//   //     console.log(token);
//   //     req.user = token;
//   //   }
// }
