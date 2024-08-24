import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto implements Pick<Prisma.PostCreateInput, 'url'> {
  @ApiProperty({
    type: String,
    description: 'The url of the post',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
