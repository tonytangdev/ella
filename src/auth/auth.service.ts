import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/common/config/config.interface';
import { Token } from './model/token.model';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(email: string, password: string) {
    const hashedPassword = await this.passwordService.hashPassword(password);

    try {
      const user = await this.userService.create({
        email,
        password: hashedPassword,
      });

      const tokens = this.generateTokens({
        userId: user.id,
      });

      await this.userService.setRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UnauthorizedException('Email already exists');
        }
      }

      throw new Error(error);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = this.generateTokens({
      userId: user.id,
    });

    await this.userService.setRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    const user = this.userService.findByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }

    try {
      const refreshConfig = this.getRefreshSecurityConfig();
      const verifiedToken = this.jwtService.verify(refreshToken, {
        secret: refreshConfig.secret,
      });

      const tokens = this.generateTokens({
        userId: verifiedToken.userId,
      });

      await this.userService.setRefreshToken(
        verifiedToken.userId,
        tokens.refreshToken,
      );

      return tokens;
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  generateTokens(payload: { userId: number }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: number }): string {
    const refreshSecurityConfig = this.getRefreshSecurityConfig();
    return this.jwtService.sign(payload, {
      secret: refreshSecurityConfig.secret,
      expiresIn: refreshSecurityConfig.expiresIn,
    });
  }

  private getRefreshSecurityConfig() {
    return {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<SecurityConfig>('security').refreshIn,
    };
  }
}
