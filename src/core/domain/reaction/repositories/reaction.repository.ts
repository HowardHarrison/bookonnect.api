import { ReactionEntity } from '@domain/reaction/entities/reaction.entity';

export const REACTION_REPOSITORY = Symbol('REACTION_REPOSITORY');

export interface ReactionRepository {
  findByUserAndBook(userId: string, bookId: string): Promise<ReactionEntity | null>;
  create(userId: string, bookId: string): Promise<void>;
  deleteByUserAndBook(userId: string, bookId: string): Promise<void>;
  countByBook(bookId: string): Promise<number>;
}
