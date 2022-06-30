import { CommentEntity } from 'src/post/entity/comment.entity';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { PostEntity } from '../post/entity/post.entity';
import { UserEntity } from '../user/entity/user.entity';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'C:\\dev\\database.db',
  // database: '/root/database.db',
  entities: ['dist/src/**/*.entity.js', UserEntity, PostEntity, CommentEntity],
  synchronize: true,
  // migrations: ['src/dist/db/migrations/*.js',],
  // migrations: ['../migrations/*.ts'],
};
export default config;
