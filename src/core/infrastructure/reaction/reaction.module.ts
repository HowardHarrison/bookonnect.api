import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllReactionStatusUseCase } from '@application/reaction/use-cases/get-all-reaction-status.use-case';
import { GetReactionStatusUseCase } from '@application/reaction/use-cases/get-reaction-status.use-case';
import { ToggleReactionUseCase } from '@application/reaction/use-cases/toggle-reaction.use-case';
import { REACTION_REPOSITORY } from '@domain/reaction/repositories/reaction.repository';
import { ReactionController } from '@presentation/reaction.controller';
import { MongooseReactionRepository } from '../repositories/mongoose-reaction.repository';
import { ReactionModel, ReactionSchema } from '../schemas/reaction.schema';

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
