import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserAuthority } from 'src/domain/entity/user-authority.entity';
import { User } from 'src/domain/entity/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'newsninetest.cxuwgutramf1.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'newsnine',
  password: 'newsnine',
  database: 'yjstudy',
  entities: [User, UserAuthority],
  synchronize: false,
  logging: true,
};

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [User, UserAuthority],
    MIGRATIONS: [__dirname + '/migrations/**/*.{.ts,.js}'],
    MIGRATIONS_RUN: false,
  };

  const ormconfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'newsninetest.cxuwgutramf1.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    username: 'newsnine',
    password: 'newsnine',
    database: 'yjstudy',
    entities: commonConf.ENTITIES,
    synchronize: commonConf.SYNCRONIZE,
    logging: true,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };

  return ormconfig;
}

export { ormConfig };
