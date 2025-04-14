import { Token } from '../entities/token.entity';

export abstract class TokenRepository {
  abstract findById(id: string): Promise<Token | null>;
  abstract findByToken(token: string): Promise<Token | null>;
  abstract findByUserId(userId: string): Promise<Token[]>;
  abstract create(token: Token): Promise<Token>;
  abstract revoke(id: string): Promise<void>;
  abstract deleteExpired(): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
