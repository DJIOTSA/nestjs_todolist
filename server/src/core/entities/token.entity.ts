import { User } from './user.entity';

export enum TokenType {
  EMAIL_CONFIRMATION = 'email_confirmation',
  API_KEY = 'api_key',
  TASK_ACCESS = 'task_access',
  PASSWORD_RESET = 'password_reset',
}

export class Token {
  id: string;
  userId: string;
  token: string; // Hashed
  tokenType: TokenType;
  targetId?: string;
  scopes?: string; // Optional permissions string/JSON
  createdAt: Date;
  expiresAt?: Date;
  revoked: boolean;
  user?: User;
}
