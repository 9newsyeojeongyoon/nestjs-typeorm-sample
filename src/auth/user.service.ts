import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<UserDto>,
  ): Promise<UserDto | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDto: UserDto): Promise<UserDto | undefined> {
    return await this.userRepository.save(userDto);
  }
}
