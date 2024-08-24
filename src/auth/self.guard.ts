import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIdToUpdate = Number(request.params.id);
    const currentUserId = request.user.userId as number;

    if (userIdToUpdate !== currentUserId) {
      return false;
    }

    return true;
  }
}
