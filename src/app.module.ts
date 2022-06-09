import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config/ormconfig';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entity/post.entity';
import { CommentModule } from './comment/comment.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostService } from './post/service/post.service';
import { CommentService } from './comment/service/comment.service';

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
      rootPath: join('/root/frontend'),
      // rootPath: 'C:\\dev\\marasite\\dist\\marasite',
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
