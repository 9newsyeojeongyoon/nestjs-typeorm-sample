import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(newUser: UserDto): Promise<UserDto> {
    let userFind: UserDto = await this.userService.findByFields({
      where: { username: newUser.username },
    });
    if (userFind) {
      throw new HttpException('Username already user!', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(newUser);
  }
}
