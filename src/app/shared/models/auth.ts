import { User } from './user';

export interface AuthData {
  id?: number;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
