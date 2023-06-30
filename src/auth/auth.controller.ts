import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerAccount(
    @Req() req: Request,
    @Body() userDto: UserDto,
  ): Promise<any> {
    return await this.authService.registerUser(userDto);
  }
}