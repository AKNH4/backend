import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/service/post.service';
import { AuthModule } from '../auth/auth.module';
import { PostEntity } from '../post/entity/post.entity';
import { CommentController } from './controller/comment.controller';
import { CommentEntity } from './entity/comment.entity';
import { CommentService } from './service/comment.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, PostEntity]),
    forwardRef(() => PostModule),
  ],
  providers: [CommentService, PostService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
