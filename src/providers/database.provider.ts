import { createConnection } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1101',
        database: 'ss',
        entities: [User, Book],
        synchronize: true,
        logging: true,
      }),
  },
];
//asdasd
