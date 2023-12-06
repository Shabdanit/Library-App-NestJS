import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { userProvider } from './providers/user.provider';
import { BookModule } from './book/book.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, UserModule, BookModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, ...userProvider, JwtService],
})
export class AppModule {}
