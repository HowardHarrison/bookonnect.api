import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  USER_AUTH_REPOSITORY,
  UserAuthRepository,
} from '../../domain/repositories/user-auth.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: UserAuthRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: { email: string; password: string }) {
    const user = await this.userAuthRepository.findByEmail(input.email);
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials.');
    }

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
