import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { bookProvider } from 'src/providers/book.provider';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...bookProvider, BookService, JwtStrategy],
})
export class BookModule {}
