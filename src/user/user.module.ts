import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { userProvider } from 'src/providers/user.provider';
import { UserService } from './user.service';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProvider, UserService, JwtStrategy, JwtAuthGuard, JwtService],
})
export class UserModule {}
