import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagOrmEntity } from '../entities/tag.orm-entity';
import { TagRepository } from 'src/core/repository/tag.repository';
import { Tag } from 'src/core/entities/tag.entity';

@Injectable()
export class TypeOrmTagRepository implements TagRepository {
  constructor(
    @InjectRepository(TagOrmEntity)
    private readonly repo: Repository<TagOrmEntity>,
  ) {}

  async findById(id: string): Promise<Tag | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Tag[]> {
    return this.repo.find({ where: { userId } });
  }

  async findPublicTags(): Promise<Tag[]> {
    return this.repo.find({ where: { isPublic: true } });
  }

  async create(tag: Tag): Promise<Tag> {
    return this.repo.save(tag);
  }

  async update(tag: Tag): Promise<Tag> {
    return this.repo.save(tag);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
