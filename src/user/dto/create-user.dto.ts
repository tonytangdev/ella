import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto
  implements Pick<Prisma.UserCreateInput, 'name' | 'email' | 'password'>
{
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
