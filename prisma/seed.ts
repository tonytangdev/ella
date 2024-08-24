import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUMBER_OF_USERS = 100;
const MAX_POSTS_PER_USER = 10;
const MAX_COMMENTS_PER_POST = 75;

async function main() {
  const users = createUser(NUMBER_OF_USERS);
  await prisma.user.createMany({
    data: users,
  });
  const createdUsers = await prisma.user.findMany({
    select: {
      id: true,
    },
  });
  const userIds = createdUsers.map((user) => user.id);

  const posts = createPosts(userIds, MAX_POSTS_PER_USER);
  await prisma.post.createMany({
    data: posts,
  });
  const createdPosts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  const postIds = createdPosts.map((post) => post.id);

  const comments = createComments(postIds, userIds, MAX_COMMENTS_PER_POST);
  await prisma.comment.createMany({
    data: comments,
  });
}

function createUser(numberOfUsers: number): Prisma.UserCreateManyInput[] {
  const users: Prisma.UserCreateManyInput[] = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const isDeleted = faker.datatype.boolean();
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      deletedAt: isDeleted ? faker.date.recent() : undefined,
    });
  }
  return users;
}

function createPosts(
  userIds: number[],
  maxPostsPerUser: number,
): Prisma.PostCreateManyInput[] {
  const posts: Prisma.PostCreateManyInput[] = [];

  for (const userId of userIds) {
    const numberOfPosts = faker.number.int(maxPostsPerUser);
    const isDeleted = faker.datatype.boolean();
    for (let i = 0; i < numberOfPosts; i++) {
      posts.push({
        url: faker.internet.url(),
        authorId: userId,
        deletedAt: isDeleted ? faker.date.recent() : undefined,
      });
    }
  }
  return posts;
}

function createComments(
  postIds: string[],
  userIds: number[],
  maxCommentsPerPost: number,
): Prisma.CommentCreateManyInput[] {
  const comments: Prisma.CommentCreateManyInput[] = [];

  for (const postId of postIds) {
    const numberOfComments = faker.number.int(maxCommentsPerPost);
    for (let i = 0; i < numberOfComments; i++) {
      const randomUserIds = faker.number.int(userIds.length - 1);
      const userId = userIds[randomUserIds];
      const isDeleted = faker.datatype.boolean();
      comments.push({
        text: faker.lorem.text(),
        postId,
        authorId: userId,
        deletedAt: isDeleted ? faker.date.recent() : undefined
      });
    }
  }
  return comments;
}

main();
