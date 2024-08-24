import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { SignUpDTO } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(signUpDTO: SignUpDTO) {
    const user = await this.prismaService.user.create({
      data: {
        email: signUpDTO.email,
        password: signUpDTO.password,
      },
    });

    return user;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });

    return user;
  }

  async setRefreshToken(userId: number, refreshToken: string) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async findByRefreshToken(refreshToken: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        refreshToken,
      },
    });

    return user;
  }
}
