import { CommentEntity } from 'src/post/entity/comment.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '../../post/entity/post.entity';
import { IPost } from '../../post/entity/post.interface';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'katzi.jpg' })
  imagePath: string;

  @CreateDateColumn()
  registeredAt: Date;

  @OneToMany(() => PostEntity, (post: IPost) => post.creator)
  posts: PostEntity[];

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity) => comment.creator,
    {},
  )
  comments: CommentEntity[];
}
