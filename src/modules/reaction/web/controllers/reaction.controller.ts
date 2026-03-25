import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AllReactionStatusDto } from '../../application/dtos/all-reaction-status.dto';
import { ReactionStatusDto } from '../../application/dtos/reaction-status.dto';
import { ToggleReactionDto } from '../../application/dtos/toggle-reaction.dto';
import { GetAllReactionStatusUseCase } from '../../application/use-cases/get-all-reaction-status.use-case';
import { GetReactionStatusUseCase } from '../../application/use-cases/get-reaction-status.use-case';
import { ToggleReactionUseCase } from '../../application/use-cases/toggle-reaction.use-case';

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
