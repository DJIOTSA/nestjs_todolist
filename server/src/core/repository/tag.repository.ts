import { Tag } from '../entities/tag.entity';

export abstract class TagRepository {
  abstract findById(id: string): Promise<Tag | null>;
  abstract findByUserId(userId: string): Promise<Tag[]>;
  abstract findPublicTags(): Promise<Tag[]>;
  abstract create(tag: Tag): Promise<Tag>;
  abstract update(tag: Tag): Promise<Tag>;
  abstract delete(id: string): Promise<void>;
}
