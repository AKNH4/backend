/// <reference types="multer" />
import { Observable } from 'rxjs';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';
import { IPost } from '../entity/post.interface';
import { PostService } from '../service/post.service';
import { Response } from 'express';
import { CreatePostDto } from '../dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getAllPosts(): Observable<IPost[]>;
    createPost(dto: CreatePostDto, user: User): Observable<IPost>;
    delete(idParam: string, user: User): Observable<ResponseMessage>;
    getAllFromUser(user: User): Observable<IPost[]>;
    uploadFile(file: Express.Multer.File): string;
    getPostImage(res: Response, param: string): Observable<void>;
    getById(id: string): Observable<IPost>;
}
