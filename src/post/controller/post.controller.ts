import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { from, map, Observable, of } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';

import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { IPost } from '../entity/post.interface';
import { PostService } from '../service/post.service';
import { Response } from 'express';
import { v4 } from 'uuid';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(): Observable<IPost[]> {
    return this.postService.findAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseUUIDPipe) id: string): Observable<IPost> {
    return this.postService.getPostByIdWithComments(id);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  createPost(
    @Body() dto: CreatePostDto,
    @GetUser() user: User,
  ): Observable<IPost> {
    return this.postService.createPost(dto, user);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  delete(
    @Param('id', ParseUUIDPipe) idParam: string,
    @GetUser() user: User,
  ): Observable<ResponseMessage> {
    return this.postService.deletePost(idParam, user);
  }

  @UseGuards(AuthGuard)
  @Get('/get-all-from-user')
  getAllFromUser(@GetUser() user: User): Observable<IPost[]> {
    return this.postService.getAllFromUser(user);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
          cb(null, `${file.filename}${v4()}.png`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get('/image/:id')
  getPostImage(
    @Res({ passthrough: true }) res: Response,
    @Param('id') param: string,
  ) {
    return of(
      res.sendFile(process.cwd(), `./uploads${(<string>param) as string}`),
    );
  }
}
