import { IsString, IsNumber, IsNotEmpty, IsInstance } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInstance(User)
  author: User;
}
