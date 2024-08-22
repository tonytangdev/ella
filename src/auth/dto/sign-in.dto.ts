import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO
  implements Pick<Prisma.UserCreateInput, 'email' | 'password'>
{
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
