import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO
  implements Pick<Prisma.UserCreateInput, 'email' | 'password'>
{
  @ApiProperty({
    type: String,
    description: 'The email of the user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
