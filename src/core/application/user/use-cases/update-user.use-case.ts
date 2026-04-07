import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USER_REPOSITORY, UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    userId: string,
    input: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      profileImage?: string;
    },
  ) {
    const updateInput = { ...input };

    if (updateInput.password) {
      updateInput.password = await bcrypt.hash(
        updateInput.password,
        await bcrypt.genSalt(),
      );
    }

    await this.userRepository.updateUser(userId, updateInput);
    return { message: 'User updated successfully.' };
  }
}
