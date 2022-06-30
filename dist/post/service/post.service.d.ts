import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.interface';
import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { PostEntity } from '../entity/post.entity';
import { IPost } from '../entity/post.interface';
import { CommentEntity } from '../entity';
export declare class PostService {
    private postRepository;
    private commentRepository;
    constructor(postRepository: Repository<PostEntity>, commentRepository: Repository<CommentEntity>);
    findAll(): Observable<IPost[]>;
    createPost(dto: Readonly<CreatePostDto>, user: User): Observable<IPost>;
    deletePost(postId: string, user: User): Observable<string>;
    getUserPosts(user: User): Observable<IPost[]>;
    findPostComments(postId: string): Observable<any>;
    updatePost(postId: string, dto: UpdatePostDto): Observable<string>;
}
