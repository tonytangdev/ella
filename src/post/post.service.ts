import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  create(authorId: number, createPostDto: CreatePostDto) {
    const post = this.prismaService.post.create({
      data: {
        url: createPostDto.url,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    return post;
  }

  findAll(params: { userId: number }) {
    return this.prismaService.post.findMany({
      where: {
        authorId: params.userId,
      },
    });
  }

  findOne(params: { userId: number; id: string }) {
    return this.prismaService.post.findUnique({
      where: {
        id: params.id,
        authorId: params.userId,
      },
    });
  }

  async remove(userId: number, id: string) {
    try {
      const post = await this.prismaService.post.update({
        where: {
          id: id,
          authorId: userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return post;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException();
      } else {
        throw error;
      }
    }
  }
}
