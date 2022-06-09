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
import { from, map, Observable } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';

import { CreatePostDto } from '../dto/createpost.dto';
import { UpdatePostDto } from '../dto/updatepost.dto';
import { IPost } from '../entity/post.interface';
import { PostService } from '../service/post.service';
import { Response } from 'express';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(): Observable<IPost[]> {
    return this.postService.findAll();
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
    @Param('id') idParam: string,
    @GetUser() user: User,
  ): Observable<ResponseMessage> {
    return this.postService.deletePost(idParam, user);
  }

  @UseGuards(AuthGuard)
  @Get('/get-all-from-user')
  getAllFromUser(@GetUser() user: User): Observable<IPost[]> {
    return this.postService.getAllFromUser(user);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Observable<IPost> {
    return this.postService.getPostByIdWithComments(id);
  }

  // @Put('/update/:id')
  // updatePost(
  //   @Body() dto: UpdatePostDto,
  //   @Param('id') param: string,
  // ): Observable<ResponseMessage> {
  //   return this.postService.updatePost(param, dto);
  // }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
          cb(null, `${file.filename}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get('/image/:id')
  getPostImage(@Res() res: Response) {}
}
