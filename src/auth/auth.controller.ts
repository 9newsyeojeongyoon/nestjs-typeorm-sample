import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RoleType } from './role-types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 회원가입
  @Post('/signup')
  @UsePipes(ValidationPipe)
  async registerAccount(@Body() userDto: UserDto): Promise<any> {
    return await this.authService.registerUser(userDto);
  }

  // 로그인
  @Post('/signin')
  async signin(@Body() userDto: UserDto, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(userDto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.send({ message: 'sign in success' });
  }

  // 로그아웃
  @Post('/signout')
  signout(@Res() res: Response): any {
    res.cookie('jwt', '', { maxAge: 0 });
    return res.send({ message: 'sign out success' });
  }

  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/admin-role')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRoleCheck(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    const jwt = req.cookies['jwt'];
    return res.send(jwt);
  }

  // 이하 구글로그인 테스트
}
