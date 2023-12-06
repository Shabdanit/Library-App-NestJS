import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/connection/Connection';
import { Book } from 'src/entities/book.entity';

export const bookProvider: Provider[] = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Book),
    inject: ['DATABASE_CONNECTION'],
  },
];
