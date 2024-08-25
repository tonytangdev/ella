import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'src/common/user-payload.interface';
import { User } from 'src/common/user.decorator';
import { PostService } from 'src/post/post.service';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly postService: PostService) {}

  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'Cursor to paginate through the feed',
  })
  @Get()
  async getFeed(@Query('cursor') cursor?: string) {
    let skip = 0;
    if (cursor) {
      skip = 1;
    }

    return this.postService.getAllPosts(cursor, skip);
  }
}
