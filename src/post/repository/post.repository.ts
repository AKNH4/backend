import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { IPost, PostEntity } from '../entity';

export class PostRepository extends Repository<PostEntity> {
  getAllPosts = (): Observable<IPost[]> => {
    return from(this.find());
  };
}
