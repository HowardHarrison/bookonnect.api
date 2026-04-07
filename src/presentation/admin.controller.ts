import { Body, Controller, Post } from '@nestjs/common';
import { AdminLoginDto } from '../core/application/admin/dtos/admin-login.dto';
import { AdminLoginUseCase } from '../../application/use-cases/admin-login.use-case';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminLoginUseCase: AdminLoginUseCase) {}

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminLoginUseCase.execute(dto);
  }
}
