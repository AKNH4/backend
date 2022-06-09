import { UserEntity } from '../../user/entity/user.entity';

export interface IPost {
  id?: string;
  title?: string;
  text?: string;
  creator?: UserEntity;
  creator_name?: string;
  postImage?: string;
  created_at?: Date;
}
