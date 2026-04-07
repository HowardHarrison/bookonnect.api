import { Inject, Injectable } from '@nestjs/common';
import {
  REACTION_REPOSITORY,
  ReactionRepository,
} from '@domain/reaction/repositories/reaction.repository';

@Injectable()
export class GetReactionStatusUseCase {
  constructor(
    @Inject(REACTION_REPOSITORY)
    private readonly reactionRepository: ReactionRepository,
  ) {}

  async execute(input: { userId: string; bookId: string }) {
    const reaction = await this.reactionRepository.findByUserAndBook(
      input.userId,
      input.bookId,
    );

    return { reacted: Boolean(reaction) };
  }
}
