import { Comment as CommentSchema } from '@prisma/client';

export class Comment implements CommentSchema {
  id: number;
  text: string;
  authorId: number;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}
