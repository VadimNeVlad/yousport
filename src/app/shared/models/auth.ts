import { User } from './user';

export interface AuthData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
