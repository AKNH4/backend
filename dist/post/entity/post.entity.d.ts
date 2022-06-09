import { CommentEntity } from '../../comment/entity/comment.entity';
import { UserEntity } from '../../user/entity/user.entity';
export declare class PostEntity {
    id: string;
    title: string;
    text: string;
    postImage?: string;
    creator: UserEntity;
    comments: CommentEntity[];
    creator_name: string;
    created_at: Date;
}
