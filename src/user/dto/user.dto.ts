export class UserDto {
  id: number;
  name: string;
  email: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
