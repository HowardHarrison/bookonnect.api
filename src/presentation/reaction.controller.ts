import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AllReactionStatusDto } from '../core/application/reaction/dtos/all-reaction-status.dto';
import { ReactionStatusDto } from '../core/application/reaction/dtos/reaction-status.dto';
import { ToggleReactionDto } from '../core/application/reaction/dtos/toggle-reaction.dto';
import { GetAllReactionStatusUseCase } from '../core/application/reaction/use-cases/get-all-reaction-status.use-case';
import { GetReactionStatusUseCase } from '../core/application/reaction/use-cases/get-reaction-status.use-case';
import { ToggleReactionUseCase } from '../core/application/reaction/use-cases/toggle-reaction.use-case';

@Controller('reactions')
export class ReactionController {
  constructor(
    private readonly toggleReactionUseCase: ToggleReactionUseCase,
    private readonly getReactionStatusUseCase: GetReactionStatusUseCase,
    private readonly getAllReactionStatusUseCase: GetAllReactionStatusUseCase,
  ) {}

  @Post()
  toggle(@Body() dto: ToggleReactionDto) {
    return this.toggleReactionUseCase.execute(dto);
  }

  @Get('status')
  getStatus(@Query() dto: ReactionStatusDto) {
    return this.getReactionStatusUseCase.execute(dto);
  }

  @Get('all')
  getAll(@Query() dto: AllReactionStatusDto) {
    return this.getAllReactionStatusUseCase.execute(dto.bookId);
  }
}
