import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class ToggleSavedBookUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, bookId: string) {
    const result = await this.userRepository.toggleSavedBook(userId, bookId);

    return {
      message: result.exists ? 'Book removed' : 'Book added',
      savedBooks: result.savedBooks,
    };
  }
}
