import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { ResponseMessage } from 'src/common';
import { PostService } from 'src/post/service/post.service';
import { Repository } from 'typeorm';
import { IPost } from '../../post/entity/post.interface';
import { User } from '../../user/entity/user.interface';
import { CreateCommentDto } from '../dto';
import { CommentEntity } from '../entity/comment.entity';
import { Comment } from '../entity/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepsitory: Repository<CommentEntity>,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
  ) {}

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return from(this.postService.getById(postId)).pipe(
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

  createComment(user: User, dto: CreateCommentDto): Observable<Comment> {
    return from(this.postService.getById(dto.postId)).pipe(
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

  // createComment(user: User, dto: CreateCommentDto): Observable<Comment> {
  //   return from(this.postRepsitory.findOne({ where: { id: dto.postId } })).pipe(
  //     switchMap((post: IPost) => {
  //       if (!post)
  //         throw new BadRequestException("Post mit dieser id gibt's nicht!");
  //       return from(
  //         this.commentRepsitory.save({
  //           text: dto.text,
  //           creator: user,
  //           post: post,
  //           creator_name: user.username,
  //         }),
  //       ).pipe(
  //         map((comment: Comment) => {
  //           const { creator, post, ...res } = comment;
  //           return res;
  //         }),
  //       );
  //     }),
  //   );
  // }

  // deleteCommentById(user: User, commentId: string): Observable<ResponseMessage> {
  //   return from(
  //     this.commentRepsitory.findOne({
  //       where: { id: commentId },
  //       relations: ['creator'],
  //       loadRelationIds: { relations: ['creator'] },
  //     }),
  //   ).pipe(
  //     switchMap((comment: Comment) => {
  //       if (!comment) throw new BadRequestException('Post gibt es nicht');
  //       if (comment.creator !== user)
  //         throw new BadRequestException('Is nich deiner!');
  //       return from(
  //         this.commentRepsitory.delete({ id: comment.id, creator: user }),
  //       ).pipe(
  //         map((res: DeleteResult) => {
  //           return { msg: 'Gelöcht!' };
  //         }),
  //       );
  //     }),
  //   );
  // }

  async deleteCommentById(user: User, commentId: string): Promise<Comment> {
    const comment = await this.commentRepsitory.findOne({
      where: {
        id: commentId,
      },
      relations: ['creator'],
      loadRelationIds: { relations: ['creator'] },
    });

    if (!comment) throw new BadRequestException('Kommentar gibt es nicht');

    if (comment.creator !== user)
      throw new UnauthorizedException('Ist nicht dein Kommentar');

    await this.commentRepsitory.delete({ id: commentId, creator: user });

    return comment;
  }
}
