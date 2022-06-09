import { PostEntity } from '../../post/entity/post.entity';
import { UserEntity } from '../../user/entity/user.entity';
export declare class CommentEntity {
    id: string;
    text: string;
    creator_name: string;
    post: PostEntity;
    creator: UserEntity;
    created_at: Date;
}
