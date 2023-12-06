import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import * as jwt from 'jsonwebtoken';
import { AuthResponse } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const user = this.userRepository.create(createUserDto);
    await user.setPassword(createUserDto.password);
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('User ID:', user.id);

    const payload = { email };

    const token = await this.jwtService.sign(payload);
    console.log('Generated Token:', token);

    return { user, token };
  }
}
