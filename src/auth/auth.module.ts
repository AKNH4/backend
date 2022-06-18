import { forwardRef, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './service/auth.service';
import AuthGuard from './guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/service/user.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '2d' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule, AuthModule],
  // imports: [
  //   forwardRef(() => UserModule),
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: async (configService: ConfigService) => ({
  //       secret: configService.get('JWT_SECRET'),
  //       signOptions: { expiresIn: '10000s' },
  //     }),
  //   }),
  // ],
  // providers: [AuthService],
  // exports: [AuthService],
})
export class AuthModule {}
