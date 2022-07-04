import {
  BadRequestException,
  forwardRef,
  Global,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { PostService } from 'src/post/service/post.service';
import { DeleteResult, Repository } from 'typeorm';
import { IPost } from '../../post/entity/post.interface';
import { User } from '../../user/entity/user.interface';
import { CreateCommentDto } from '../dto';
import { PostEntity } from '../entity';
import { CommentEntity } from '../entity/comment.entity';
import { Comment } from '../entity/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepsitory: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  getPostComments(postId: string): Observable<Comment[]> {
    return from(this.postRepository.findOne({ where: { id: postId } })).pipe(
      switchMap((post: IPost) => {
        if (!post) throw new BadRequestException('Post gibt es nicht');
        return from(
          this.commentRepsitory.find({
            where: {
              post: { id: postId },
            },
            loadRelationIds: { relations: ['creator'] },
            order: {
              created_at: 'DESC',
            },
            take: 10,
          }),
        );
      }),
    );
  }

  createComment(
    user: User,
    dto: Readonly<CreateCommentDto>,
    postId: string,
  ): Observable<Comment> {
    return from(this.postRepository.findOne({ where: { id: postId } })).pipe(
      switchMap((post: IPost) => {
        if (!post) throw new BadRequestException('Post gibts nicht');
        return from(
          this.commentRepsitory.save({
            text: dto.text,
            post: post,
            creator: user,
            creator_name: user.username,
          }),
        ).pipe(
          map((comment: Comment) => {
            delete comment.creator;
            delete comment.post;
            return comment;
          }),
        );
      }),
    );
  }

  deleteCommentById(userId: string, commentId: string): Observable<string> {
    return from(
      this.commentRepsitory.findOne({
        where: { id: commentId },
        relations: ['creator'],
      }),
    ).pipe(
      switchMap((comment: Comment) => {
        if (!comment) throw new BadRequestException('Kommentar gibt es nicht');
        if (comment.creator.id !== userId)
          throw new BadRequestException('Ist nicht dein Kommentar');
        return from(
          this.commentRepsitory.delete({
            id: comment.id,
            creator: { id: userId },
          }),
        ).pipe(map(() => 'Kommentar gelöscht'));
      }),
    );
  }
}
