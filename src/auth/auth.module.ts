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
    // JwtModule.register({
    //   secret: '1234',
    //   signOptions: { expiresIn: '2d' },
    // }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'alskjfh8790aoPyfoansdfAKDS87yno87nq6ftqof8pqnf6teptnPNF',
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule, AuthModule],
  // imports: [
  // JwtModule.registerAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory: async (configService: ConfigService) => ({
  //     secret: 'alskjfh8790aoPyfoansdfAKDS87yno87nq6ftqof8pqnf6teptnPNF',
  //     signOptions: { expiresIn: '7d' },
  //   }),
  // }),
  // ],
  // providers: [AuthService],
  // exports: [AuthService],
})
export class AuthModule {}
