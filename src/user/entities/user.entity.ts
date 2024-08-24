import { User as UserSchema } from '@prisma/client';

export class User implements UserSchema {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  refreshToken: string;
}
