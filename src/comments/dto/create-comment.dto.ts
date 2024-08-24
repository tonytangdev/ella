import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto
  implements Pick<Prisma.CommentCreateInput, 'text'>
{
  @ApiProperty({
    type: String,
    description: 'The text of the comment',
  })
  text: string;

  @ApiProperty({
    type: String,
    description: 'The id of the post that the comment belongs to',
  })
  postId: string;
}
