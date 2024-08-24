import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
        authorId: params.userId,
        id: params.id,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
