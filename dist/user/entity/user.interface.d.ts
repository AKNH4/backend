import { CommentEntity } from 'src/post/entity/comment.entity';
import { PostEntity } from '../../post/entity/post.entity';
export interface User {
    id?: string;
    username?: string;
    password?: string;
    registered?: Date;
    posts?: PostEntity[];
    comments?: CommentEntity[];
}
