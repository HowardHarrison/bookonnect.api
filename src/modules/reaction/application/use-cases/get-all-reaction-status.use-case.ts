import { Inject, Injectable } from '@nestjs/common';
import {
  REACTION_REPOSITORY,
  ReactionRepository,
} from '../../domain/repositories/reaction.repository';

@Injectable()
export class GetAllReactionStatusUseCase {
  constructor(
    @Inject(REACTION_REPOSITORY)
    private readonly reactionRepository: ReactionRepository,
  ) {}

  async execute(bookId: string) {
    const totalReactions = await this.reactionRepository.countByBook(bookId);
    return { totalReactions };
  }
}
