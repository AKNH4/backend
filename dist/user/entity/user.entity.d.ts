import { CommentEntity } from 'src/post/entity/comment.entity';
import { PostEntity } from '../../post/entity/post.entity';
export declare class UserEntity {
    id: string;
    username: string;
    password: string;
    registeredAt: Date;
    posts: PostEntity[];
    comments: CommentEntity[];
}
