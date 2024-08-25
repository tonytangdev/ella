import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [FeedController],
  imports: [PostModule],
})
export class FeedModule {}
