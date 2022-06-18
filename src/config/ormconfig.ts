import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { CommentEntity } from '../comment/entity/comment.entity';
import { PostEntity } from '../post/entity/post.entity';
import { UserEntity } from '../user/entity/user.entity';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'C:\\dev\\database.db',
  // database: '/root/database.db',
  entities: ['dist/src/**/*.entity.js', UserEntity, PostEntity, CommentEntity],
  synchronize: true,
  migrations: ['src/dist/db/migrations/*.js'],
};
export default config;
