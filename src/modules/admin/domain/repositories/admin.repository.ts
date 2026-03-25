import { AdminEntity } from '../entities/admin.entity';

export const ADMIN_REPOSITORY = Symbol('ADMIN_REPOSITORY');

export interface AdminRepository {
  findByEmail(email: string): Promise<AdminEntity | null>;
}
