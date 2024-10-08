import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';
import { Public } from 'src/common/public.decorator';
import { RefreshDTO } from './dto/refresh.dto';
import { User } from 'src/common/user.decorator';
import { UserPayload } from 'src/common/user-payload.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO) {
    return this.authService.createUser(signUpDTO.email, signUpDTO.password);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.email, loginDTO.password);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async profile() {
    return 'You are logged in';
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  async refresh(@Body() refreshDTO: RefreshDTO) {
    const { refreshToken } = refreshDTO;
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@User() user: UserPayload) {
    await this.authService.logout(user.userId);
  }
}
