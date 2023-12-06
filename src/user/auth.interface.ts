import { User } from 'src/entities/user.entity';

export interface AuthResponse {
  user: User;
  token: string;
}
