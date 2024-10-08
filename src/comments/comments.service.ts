import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'nestjs-prisma';
import { AnswerCommentDto } from './dto/answer-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(authorId: number, createCommentDto: CreateCommentDto) {
    return this.prismaService.comment.create({
      data: {
        text: createCommentDto.text,
        post: {
          connect: {
            id: createCommentDto.postId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  async remove(authorId: number, id: number) {
    const comment = await this.prismaService.comment.update({
      where: {
        id,
        authorId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return comment;
  }

  async findAll(params: { postId: string }) {
    return this.prismaService.comment.findMany({
      where: {
        postId: params.postId,
        deletedAt: null,
      },
    });
  }

  async answerToComment(
    authorId: number,
    commentId: number,
    answerToCommentDto: AnswerCommentDto,
  ) {
    return this.prismaService.comment.create({
      data: {
        text: answerToCommentDto.text,
        author: {
          connect: {
            id: authorId,
          },
        },
        comment: {
          connect: {
            id: commentId,
          },
        },
      },
    });
  }

  async getAnswers(commentId: number) {
    return this.prismaService.comment.findMany({
      where: {
        commentId,
      },
    });
  }
}
