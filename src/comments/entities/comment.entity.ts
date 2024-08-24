import { Comment as CommentSchema } from '@prisma/client';

export class Comment implements CommentSchema {
  id: number;
  text: string;
  authorId: number;
  postId: string;
  commentId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
