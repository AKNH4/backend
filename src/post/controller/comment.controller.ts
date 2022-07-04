import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';
import { Comment } from '../entity/comment.interface';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  getCommentsByPostId(@Param('id') postId: string): Observable<Comment[]> {
    return this.commentService.getPostComments(postId);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  createComment(
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) postId: string,
  ): Observable<Comment> {
    return this.commentService.createComment(user, dto, postId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteComment(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) commentId: string,
  ): Observable<ResponseMessage> {
    return this.commentService
      .deleteCommentById(user.id, commentId)
      .pipe(map((msg: string) => ({ msg })));
  }
}
