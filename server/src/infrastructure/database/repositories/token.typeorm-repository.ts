import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { TokenOrmEntity } from '../entities/token.orm-entity';
import { TokenRepository } from 'src/core/repository/token.repository';
import { Token } from 'src/core/entities/token.entity';

@Injectable()
export class TypeOrmTokenRepository implements TokenRepository {
  constructor(
    @InjectRepository(TokenOrmEntity)
    private readonly repo: Repository<TokenOrmEntity>,
  ) {}

  async findById(id: string): Promise<Token | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByToken(token: string): Promise<Token | null> {
    return this.repo.findOne({ where: { token } });
  }

  async findByUserId(userId: string): Promise<Token[]> {
    return this.repo.find({ where: { userId } });
  }

  async create(token: Token): Promise<Token> {
    return this.repo.save(token);
  }

  async revoke(id: string): Promise<void> {
    await this.repo.update(id, { revoked: true });
  }

  async deleteExpired(): Promise<void> {
    await this.repo.delete({ expiresAt: LessThan(new Date()) });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
