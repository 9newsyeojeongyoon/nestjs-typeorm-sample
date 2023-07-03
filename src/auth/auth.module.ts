import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { User } from '../domain/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserAuthority } from '../domain/entity/user-authority.entity';
import { UserAuthorityRepository } from './repository/user-authority.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthority]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '3600s' },
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule, AuthService, UserService],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    UserAuthorityRepository,
    JwtStrategy,
  ],
})
export class AuthModule {}
