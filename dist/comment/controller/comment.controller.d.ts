import { Observable } from 'rxjs';
import { User } from '../../user/entity/user.interface';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entity/comment.interface';
import { CommentService } from '../service/comment.service';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getCommentsByPostId(postId: string): Observable<Comment[]>;
    createComment(dto: CreateCommentDto, user: User): Observable<Comment>;
    deleteComment(user: User, commentId: string): Promise<Comment>;
}
