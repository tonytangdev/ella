import { Controller, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/user.decorator';
import { UserPayload } from 'src/common/user-payload.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('')
  update(@User() user: UserPayload, @Body() updateUserDto: UpdateUserDto) {
    const id = user.userId;
    return this.userService.update(id, updateUserDto);
  }
}
