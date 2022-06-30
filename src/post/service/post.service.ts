import {
  BadRequestException,
  forwardRef,
  Global,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap } from 'rxjs';

import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';
import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { PostEntity } from '../entity/post.entity';
import { IPost } from '../entity/post.interface';
import { Comment } from '../entity/comment.interface';
import { CommentService } from './comment.service';
import { PostRepository } from '../repository/post.repository';
import { CommentEntity } from '../entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
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

  createPost(dto: Readonly<CreatePostDto>, user: User): Observable<IPost> {
    return from(
      this.postRepository.save({
        text: dto.text,
        title: dto.title,
        creator_name: user.username,
        creator: user,
      }),
    ).pipe(
      map((createdPost: IPost) => {
        delete createdPost.creator;
        return createdPost;
      }),
    );
  }

  deletePost(postId: string, user: User): Observable<string> {
    return from(
      this.postRepository.findOne({
        where: { id: postId },
        relations: ['creator'],
        loadRelationIds: { relations: ['creator'] },
      }),
    ).pipe(
      switchMap((post: any) => {
        if (!post) throw new NotFoundException('Post gibt es nicht');
        if (post.creator !== user.id)
          throw new BadRequestException('Ist nicth deiner!');
        return from(
          this.postRepository.delete({ id: post.id, creator: user }),
        ).pipe(map(() => 'Gelöcht!'));
      }),
    );
  }

  getUserPosts(user: User): Observable<IPost[]> {
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

  findPostComments(postId: string): Observable<any> {
    return from(
      this.postRepository.findOne({
        where: {
          id: postId,
        },
      }),
    ).pipe(
      switchMap((post: IPost) => {
        if (!post)
          throw new NotFoundException('Post mit dieser id gibt es nicht');
        return from(
          this.commentRepository.find({ where: { post: { id: postId } } }),
        ).pipe(
          map((comments: Comment[]) => ({ ...post, comments: [...comments] })),
        );
      }),
    );
  }

  updatePost(postId: string, dto: UpdatePostDto): Observable<string> {
    return from(this.postRepository.findOne({ where: { id: postId } })).pipe(
      switchMap((post: IPost) => {
        if (!post)
          throw new BadRequestException("Post mit dieser id gibt's nicht");
        return from(
          this.postRepository.update(
            { id: postId },
            { title: dto.title, text: dto.text },
          ),
        ).pipe(map(() => 'Post aktualisiert'));
      }),
    );
  }
}
