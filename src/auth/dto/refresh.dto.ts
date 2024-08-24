import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDTO {
  @ApiProperty({
    type: String,
    description: 'The refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
