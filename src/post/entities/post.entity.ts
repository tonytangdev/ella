import { Post as PostEntity } from '@prisma/client';

export class Post implements PostEntity {
  id: string;
  url: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
