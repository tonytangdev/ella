import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/user.decorator';
import { UserPayload } from 'src/common/user-payload.interface';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@User() user: UserPayload, @Body() createCommentDto: CreateCommentDto) {
    const userId = user.userId;
    return this.commentsService.create(userId, createCommentDto);
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    const userId = user.userId;
    return this.commentsService.remove(userId, +id);
  }
}
