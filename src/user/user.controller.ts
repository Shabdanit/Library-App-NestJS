import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthResponse } from './auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        throw new HttpException(
          'All fields are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userService.register(createUserDto);
      return { message: 'Registration successful', user };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user: AuthResponse = await this.userService.login(email, password);
      return { message: 'Login successful', user };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'User not found' };
      }
      if (error instanceof UnauthorizedException) {
        return { message: 'Invalid credentials' };
      }
      throw error;
    }
  }
}
