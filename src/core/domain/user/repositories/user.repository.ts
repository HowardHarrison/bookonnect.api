import { UserEntity } from '@domain/user/entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  toggleSavedBook(userId: string, bookId: string): Promise<{ savedBooks: string[]; exists: boolean }>;
  updateUser(
    userId: string,
    input: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      profileImage?: string;
    },
  ): Promise<void>;
}
