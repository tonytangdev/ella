import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerCommentDto
  implements Pick<Prisma.CommentCreateInput, 'text'>
{
  @ApiProperty({
    type: String,
    description: 'The text of the comment',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
