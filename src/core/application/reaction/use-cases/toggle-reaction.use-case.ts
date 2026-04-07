import { Inject, Injectable } from '@nestjs/common';
import {
  REACTION_REPOSITORY,
  ReactionRepository,
} from '@domain/reaction/repositories/reaction.repository';

@Injectable()
export class ToggleReactionUseCase {
  constructor(
    @Inject(REACTION_REPOSITORY)
    private readonly reactionRepository: ReactionRepository,
  ) {}

  async execute(input: { userId: string; bookId: string }) {
    const existing = await this.reactionRepository.findByUserAndBook(
      input.userId,
      input.bookId,
    );

    if (existing) {
      await this.reactionRepository.deleteByUserAndBook(input.userId, input.bookId);
      return { message: 'Reaction removed', reacted: false };
    }

    await this.reactionRepository.create(input.userId, input.bookId);
    return { message: 'Reaction added', reacted: true };
  }
}
