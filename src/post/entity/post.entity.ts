import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../../comment/entity/comment.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts, {
    onDelete: 'CASCADE',
  })
  creator: UserEntity;

  @OneToMany(() => CommentEntity, (type) => type.post)
  comments: CommentEntity[];

  @Column()
  creator_name: string;

  @CreateDateColumn()
  created_at: Date;
}
