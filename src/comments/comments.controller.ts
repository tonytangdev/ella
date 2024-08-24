import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/user.decorator';
import { UserPayload } from 'src/common/user-payload.interface';
import { AnswerCommentDto } from './dto/answer-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  answerToComment(
    @User() user: UserPayload,
    @Param('id') id: string,
    @Body() answerToCommentDto: AnswerCommentDto,
  ) {
    const userId = user.userId;
    return this.commentsService.answerToComment(
      userId,
      +id,
      answerToCommentDto,
    );
  }

  @Get(':id/answers')
  getAnswers(@Param('id') id: string) {
    return this.commentsService.getAnswers(+id);
  }

  @Post()
  create(
    @User() user: UserPayload,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = user.userId;
    return this.commentsService.create(userId, createCommentDto);
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    const userId = user.userId;
    return this.commentsService.remove(userId, +id);
  }
}
