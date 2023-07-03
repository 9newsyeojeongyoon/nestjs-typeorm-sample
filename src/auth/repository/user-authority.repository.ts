import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserAuthority } from '../../domain/entity/user-authority.entity';

@Injectable()
export class UserAuthorityRepository extends Repository<UserAuthority> {
  constructor(private dataSource: DataSource) {
    super(UserAuthority, dataSource.createEntityManager());
  }
}
