import { Observable } from 'rxjs';
import { PostService } from 'src/post/service/post.service';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.interface';
import { CreateCommentDto } from '../dto';
import { CommentEntity } from '../entity/comment.entity';
import { Comment } from '../entity/comment.interface';
export declare class CommentService {
    private postService;
    private readonly commentRepsitory;
    constructor(postService: PostService, commentRepsitory: Repository<CommentEntity>);
    getCommentsByPostId(postId: string): Observable<Comment[]>;
    createComment(user: User, dto: CreateCommentDto, postId: string): Observable<Comment>;
    deleteCommentById(userId: string, commentId: string): Observable<string>;
}
