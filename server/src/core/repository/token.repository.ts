import { Token } from '../entities/token.entity';

export abstract class TokenRepository {
  abstract findById(id: string): Promise<Token | null>;
  abstract findByToken(token: string): Promise<Token | null>;
  abstract create(token: Partial<Token>): Promise<Token>;
  abstract update(id: string, Token: Partial<Token>): Promise<Token | null>;
  // Add other necessary methods: delete, findAll (for admin), later, etc.
}
