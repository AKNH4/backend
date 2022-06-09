import { PostEntity } from '../../post/entity/post.entity';
import { UserEntity } from '../../user/entity/user.entity';
export interface Comment {
    id?: string;
    text?: string;
    creator?: UserEntity;
    post?: PostEntity;
    creator_name?: string;
    created_at?: Date;
}
