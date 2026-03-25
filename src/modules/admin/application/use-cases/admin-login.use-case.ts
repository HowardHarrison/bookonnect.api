import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  ADMIN_REPOSITORY,
  AdminRepository,
} from '../../domain/repositories/admin.repository';

@Injectable()
export class AdminLoginUseCase {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(input: { email: string; password: string }) {
    const admin = await this.adminRepository.findByEmail(input.email);
    if (!admin) {
      throw new BadRequestException('Admin does not exist.');
    }

    const isMatch = await bcrypt.compare(input.password, admin.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = sign(
      { id: admin.id },
      this.configService.getOrThrow<string>('JWT_SECRET'),
    );

    return {
      token,
      user: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        isActive: admin.isActive,
      },
    };
  }
}
