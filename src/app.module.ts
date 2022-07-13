import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config/ormconfig';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { WeatherModule } from './weather/weather.module';
import { User\controller\imageController } from './user/controller/image.controller';
import { User\service\imageService } from './user/service/image.service';
import { TestModule } from './test/test.module';
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'Ammonium8',
    //   database: 'auth',
    //   entities: [UserEntity, PostEntity],
    //   synchronize: true,
    //   migrations: ['dist/src/db/migrations/*.js'],
    //   cli: {
    //     migrationsDir: 'src/db/migrations',
    //   },
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    ServeStaticModule.forRoot({
      // rootPath: join('/root/frontend'),
      rootPath: 'C:\\dev\\marasite\\dist\\marasite',
    }),
    UserModule,
    AuthModule,
    PostModule,
    WeatherModule,
    TestModule,
  ],
  controllers: [AppController, User\controller\imageController],
  providers: [AppService, User\service\imageService],
})
export class AppModule {}
