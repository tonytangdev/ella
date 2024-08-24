import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto implements Pick<Prisma.PostCreateInput, 'url'> {
  @IsString()
  @IsNotEmpty()
  url: string;
}
