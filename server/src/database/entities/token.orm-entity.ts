import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

export enum TokenType {
  EMAIL_CONFIRMATION = 'email_confirmation',
  API_KEY = 'api_key',
  TASK_ACCESS = 'task_access',
  PASSWORD_RESET = 'password_reset',
}

@Entity('tokens')
export class TokenOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  token: string; // Hashed string

  @Column({
    name: 'token_type',
    type: 'enum',
    enum: TokenType,
  })
  tokenType: TokenType;

  @Column({ name: 'target_id', nullable: true })
  targetId?: string;

  @Column({ nullable: true, type: 'text' })
  scopes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => UserOrmEntity, (user) => user.tokens, { eager: false })
  user?: UserOrmEntity;
}
