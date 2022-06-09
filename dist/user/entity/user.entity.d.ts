import { CommentEntity } from '../../comment/entity/comment.entity';
import { PostEntity } from '../../post/entity/post.entity';
export declare class UserEntity {
    id: string;
    username: string;
    password: string;
    registered: Date;
    posts: PostEntity[];
    comments: CommentEntity[];
}
