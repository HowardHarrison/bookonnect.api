import { UserAuthEntity } from '@domain/auth/entities/user-auth.entity';

export const USER_AUTH_REPOSITORY = Symbol('USER_AUTH_REPOSITORY');

export interface UserAuthRepository {
  findByEmail(email: string): Promise<UserAuthEntity | null>;
  create(input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
  }): Promise<UserAuthEntity>;
}
