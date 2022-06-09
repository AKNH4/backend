import { Observable } from 'rxjs';
import { PostService } from 'src/post/service/post.service';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.interface';
import { CreateCommentDto } from '../dto';
import { CommentEntity } from '../entity/comment.entity';
import { Comment } from '../entity/comment.interface';
export declare class CommentService {
    private commentRepsitory;
    private postService;
    constructor(commentRepsitory: Repository<CommentEntity>, postService: PostService);
    getCommentsByPostId(postId: string): Observable<Comment[]>;
    createComment(user: User, dto: CreateCommentDto): Observable<Comment>;
    deleteCommentById(user: User, commentId: string): Promise<Comment>;
}
