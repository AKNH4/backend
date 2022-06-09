import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthGuard from '../../auth/guard/auth.guard';
import { GetUser } from '../../decorator/getuser.decorator';
import { User } from '../../user/entity/user.interface';
import { ResponseMessage } from '../../common/dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entity/comment.interface';
import { CommentService } from '../service/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  getCommentsByPostId(@Param('id') postId: string): Observable<Comment[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  createComment(
    @Body() dto: CreateCommentDto,
    @GetUser() user: User,
  ): Observable<Comment> {
    return this.commentService.createComment(user, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteComment(
    @GetUser() user: User,
    @Param('id') commentId: string,
  ): Promise<Comment> {
    return this.commentService.deleteCommentById(user, commentId);
  }
}
