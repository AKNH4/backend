import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Comment } from '../../comment/entity/comment.interface';
import { UserEntity } from '../../user/entity/user.entity';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';
import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { PostEntity } from '../entity/post.entity';
import { IPost } from '../entity/post.interface';
import { CommentService } from 'src/comment/service/comment.service';
export declare class PostService {
    private postRepository;
    private commentService;
    constructor(postRepository: Repository<PostEntity>, commentService: CommentService);
    findAll(): Observable<IPost[]>;
    createPost(dto: CreatePostDto, user: User): Observable<IPost>;
    deletePost(postId: string, user: User): Observable<ResponseMessage>;
    getAllFromUser(user: User): Observable<IPost[]>;
    getById(id: string): Observable<IPost>;
    getPostByIdWithComments(postId: string): Observable<{
        comments: Comment[];
        id?: string;
        title?: string;
        text?: string;
        creator?: UserEntity;
        creator_name?: string;
        created_at?: Date;
    }>;
    updatePost(postId: string, dto: UpdatePostDto): Observable<ResponseMessage>;
    isPostOwner(id: string, user: User): void;
    uploadImage(filename: string): void;
}
