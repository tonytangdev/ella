import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    nullable: true,
  })
  email?: string;

  @ApiProperty({
    type: String,
    description: 'The name of the user',
    nullable: true,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    nullable: true,
  })
  password?: string;
}
