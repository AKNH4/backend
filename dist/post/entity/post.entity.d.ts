import { UserEntity } from '../../user/entity/user.entity';
import { CommentEntity } from './comment.entity';
export declare class PostEntity {
    id: string;
    title: string;
    text: string;
    creator: UserEntity;
    comments: CommentEntity[];
    creator_name: string;
    created_at: Date;
}
