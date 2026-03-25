import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from '../../../../infrastructure/files/multer.config';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';

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
