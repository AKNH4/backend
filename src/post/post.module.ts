import { forwardRef, Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/service/comment.service';
import { CommentEntity } from '../comment/entity/comment.entity';

import { PostController } from './controller/post.controller';
import { PostEntity } from './entity/post.entity';
import { PostService } from './service/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CommentEntity]),
    CommentModule,
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
