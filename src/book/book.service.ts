import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(createBookDto);
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new BadRequestException('Failed to create book');
    }
  }

  async getAllBook(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBook(id: number): Promise<Book> {
    return this.bookRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, book: Partial<Book>): Promise<Book> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
