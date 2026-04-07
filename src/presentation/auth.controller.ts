import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginDto } from '../core/application/auth/dtos/login.dto';
import { RegisterDto } from '../core/application/auth/dtos/register.dto';
import { LoginUseCase } from '../core/application/auth/use-cases/login.use-case';
import { RegisterUseCase } from '../core/application/auth/use-cases/register.use-case';
import { imageUploadOptions } from '../core/infrastructure/files/multer.config';

@Controller()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage', imageUploadOptions))
  register(@Body() dto: RegisterDto, @UploadedFile() file?: Express.Multer.File) {
    return this.registerUseCase.execute({
      ...dto,
      profileImage: file ? `assets/${file.filename}` : undefined,
    });
  }
}
