import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO) {
    return this.authService.createUser(signUpDTO.email, signUpDTO.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.email, loginDTO.password);
  }
}
