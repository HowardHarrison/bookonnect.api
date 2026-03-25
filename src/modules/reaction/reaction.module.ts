import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllReactionStatusUseCase } from './application/use-cases/get-all-reaction-status.use-case';
import { GetReactionStatusUseCase } from './application/use-cases/get-reaction-status.use-case';
import { ToggleReactionUseCase } from './application/use-cases/toggle-reaction.use-case';
import { REACTION_REPOSITORY } from './domain/repositories/reaction.repository';
import { MongooseReactionRepository } from './infrastructure/repositories/mongoose-reaction.repository';
import { ReactionModel, ReactionSchema } from './infrastructure/schemas/reaction.schema';
import { ReactionController } from './web/controllers/reaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ReactionModel.name, schema: ReactionSchema }]),
  ],
  controllers: [ReactionController],
  providers: [
    ToggleReactionUseCase,
    GetReactionStatusUseCase,
    GetAllReactionStatusUseCase,
    MongooseReactionRepository,
    {
      provide: REACTION_REPOSITORY,
      useExisting: MongooseReactionRepository,
    },
  ],
})
export class ReactionModule {}
