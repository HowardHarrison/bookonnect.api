import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../common/guards/auth.guard';
import { ToggleSavedBookDto } from '../core/application/user/dtos/toggle-saved-book.dto';
import { UpdateUserDto } from '../core/application/user/dtos/update-user.dto';
import { GetUserByIdUseCase } from '../core/application/user/use-cases/get-user-by-id.use-case';
import { ToggleSavedBookUseCase } from '../core/application/user/use-cases/toggle-saved-book.use-case';
import { UpdateUserUseCase } from '../core/application/user/use-cases/update-user.use-case';
import { imageUploadOptions } from '../core/infrastructure/files/multer.config';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly toggleSavedBookUseCase: ToggleSavedBookUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.getUserByIdUseCase.execute(id);
  }

  @Patch(':userId/toggle-book')
  @UseGuards(AuthGuard)
  toggleSavedBook(
    @Param('userId') userId: string,
    @Body() dto: ToggleSavedBookDto,
  ) {
    return this.toggleSavedBookUseCase.execute(userId, dto.bookId);
  }

  @Put(':userId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profileImage', imageUploadOptions))
  updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.updateUserUseCase.execute(userId, {
      ...dto,
      profileImage: file ? `assets/${file.filename}` : undefined,
    });
  }
}
