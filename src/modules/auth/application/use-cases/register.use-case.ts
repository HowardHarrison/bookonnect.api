import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  USER_AUTH_REPOSITORY,
  UserAuthRepository,
} from '../../domain/repositories/user-auth.repository';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: UserAuthRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage?: string;
  }) {
    const existingUser = await this.userAuthRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('User already exists.');
    }

    const passwordHash = await bcrypt.hash(input.password, await bcrypt.genSalt());
    const user = await this.userAuthRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: passwordHash,
      profileImage: input.profileImage ?? 'assets/profile.jpg',
    });

    const token = sign(
      { id: user.id },
      this.configService.getOrThrow<string>('JWT_SECRET'),
    );

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        savedBooks: user.savedBooks,
      },
    };
  }
}
