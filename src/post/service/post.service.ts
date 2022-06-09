import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';

import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CommentEntity } from '../../comment/entity/comment.entity';
import { Comment } from '../../comment/entity/comment.interface';
import { UserEntity } from '../../user/entity/user.entity';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';
import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { PostEntity } from '../entity/post.entity';
import { IPost } from '../entity/post.interface';
import { CommentService } from 'src/comment/service/comment.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @Inject(forwardRef(() => CommentService))
    private commentService: CommentService,
  ) {}

  findAll(): Observable<IPost[]> {
    return from(
      this.postRepository.find({
        order: {
          created_at: 'DESC',
        },
        relations: ['creator'],
        loadRelationIds: { relations: ['creator'] },
      }),
    );
  }

  createPost(dto: CreatePostDto, user: User): Observable<IPost> {
    return from(
      this.postRepository.save({
        text: dto.text,
        title: dto.title,
        creator_name: user.username,
        creator: user,
        // postImage: dto.postImage,
      }),
    ).pipe(
      map((createdPost: IPost) => {
        delete createdPost.creator;
        return createdPost;
      }),
    );
  }

  deletePost(postId: string, user: User): Observable<ResponseMessage> {
    return from(
      this.postRepository.findOne({
        where: { id: postId },
        relations: ['creator'],
        loadRelationIds: { relations: ['creator'] },
      }),
    ).pipe(
      switchMap((post: any) => {
        if (!post) throw new BadRequestException('Post gibt es nicht');
        if (post.creator !== user.id)
          throw new BadRequestException('Is nich deiner!');
        return from(
          this.postRepository.delete({ id: post.id, creator: user }),
        ).pipe(
          map((res: DeleteResult) => {
            return { msg: 'Gelöcht!' };
          }),
        );
      }),
    );
  }

  getAllFromUser(user: User): Observable<IPost[]> {
    return from(
      this.postRepository.find({
        where: { creator: { id: user.id } },
        order: {
          created_at: 'DESC',
        },
        relations: ['creator'],
        loadRelationIds: { relations: ['creator'] },
      }),
    );
  }

  getById(id: string): Observable<IPost> {
    return from(this.postRepository.findOne({ where: { id } })).pipe(
      map((post: IPost) => {
        if (!post) throw new NotFoundException('Post gibt es nicht');
        return post;
      }),
    );
  }

  getPostByIdWithComments(postId: string) {
    return from(
      this.postRepository.findOne({
        where: {
          id: postId,
        },
      }),
    ).pipe(
      switchMap((post: IPost) => {
        if (!post)
          throw new BadRequestException('Post mit dieser id gibt es nicht');
        return from(this.commentService.getCommentsByPostId(post.id)).pipe(
          map((comments: Comment[]) => ({ ...post, comments: [...comments] })),
        );
      }),
    );
  }

  updatePost(postId: string, dto: UpdatePostDto): Observable<ResponseMessage> {
    return from(this.postRepository.findOne({ where: { id: postId } })).pipe(
      switchMap((post: IPost) => {
        if (!post)
          throw new BadRequestException("Post mit dieser id gibt's nicht");
        return from(
          this.postRepository.update(
            { id: postId },
            { title: dto.title, text: dto.text },
          ),
        ).pipe(
          map((res: UpdateResult) => {
            return { msg: 'Post aktualisiert' };
          }),
        );
      }),
    );
  }

  isPostOwner(id: string, user: User) {}

  uploadImage(filename: string) {}
}
