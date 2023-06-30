import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<UserDto>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDto: UserDto): Promise<User | undefined> {
    await this.transformPassword(userDto);
    return await this.userRepository.save(userDto);
  }

  async transformPassword(userDto: UserDto): Promise<void> {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    return Promise.resolve();
  }
}
