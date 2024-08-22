import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO) {
    return this.authService.createUser(signUpDTO.email, signUpDTO.password);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.email, loginDTO.password);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async profile() {
    return 'You are logged in';
  }
}
