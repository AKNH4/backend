import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableForeignKey,
} from 'typeorm';
import { PostEntity } from '../../post/entity/post.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  // @ManyToOne((type) => UserEntity, (achievement) => achievement.username)
  @Column()
  creator_name: string;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments, {
    onDelete: 'CASCADE',
  })
  creator: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}
