import { forwardRef, Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controller/comment.controller';

import { PostController } from './controller/post.controller';
import { CommentEntity } from './entity/comment.entity';
import { PostEntity } from './entity/post.entity';
import { PostRepository } from './repository/post.repository';
import { CommentService } from './service/comment.service';
import { PostService } from './service/post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CommentEntity, PostRepository]),
  ],
  providers: [PostService, CommentService],
  controllers: [PostController, CommentController],
  exports: [PostService, CommentService],
})
export class PostModule {}
