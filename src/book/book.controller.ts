import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { Book } from 'src/entities/book.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  private readonly logger = new Logger(BookController.name);

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createBookDto: CreateBookDto, @Req() req) {
    this.logger.log(
      `Incoming request with token: ${req.headers.authorization}`,
    );
    return await this.bookService.create(createBookDto);
  }
  @Get('/all')
  async getBooks() {
    return await this.bookService.getAllBook();
  }
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.bookService.getBook(id);
  }
  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() book: Book) {
    return await this.bookService.update(id, book);
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.bookService.delete(id);
  }
}
