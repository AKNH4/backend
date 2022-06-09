// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: '1234',
//     });
//   }

//   async validate(payload: any) {
//     return { ...payload.user };
//   }
// }
