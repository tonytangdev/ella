import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserPayload } from 'src/common/user-payload.interface';
import { User } from 'src/common/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @User() user: UserPayload,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = user.userId;
    return this.postService.create(userId, createPostDto);
  }

  @Get()
  async findAll(@User() user: UserPayload) {
    const userId = user.userId;
    return this.postService.findAll({
      userId,
    });
  }

  @Get(':id')
  async findOne(@User() user: UserPayload, @Param('id') id: string) {
    const userId = user.userId;

    const post = await this.postService.findOne({
      userId: userId,
      id: id,
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Delete(':id')
  remove(@User() user: UserPayload, @Param('id') id: string) {
    const userId = user.userId;
    return this.postService.remove({
      userId,
      id,
    });
  }
}
