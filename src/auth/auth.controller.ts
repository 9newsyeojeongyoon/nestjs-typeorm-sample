import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async registerAccount(
    @Req() req: Request,
    @Body() userDto: UserDto,
  ): Promise<any> {
    return await this.authService.registerUser(userDto);
  }

  @Post('/signin')
  async signin(@Body() userDto: UserDto, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(userDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }
}
