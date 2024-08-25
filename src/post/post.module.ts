import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [CommentsModule],
  exports: [PostService],
})
export class PostModule {}
