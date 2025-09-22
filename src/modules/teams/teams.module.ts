// src/teams/teams.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team } from '@/entities/team.entity';
import { UsersModule } from '../users/users.module';
import { TeamMembersModule } from '../team-members/team-members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    UsersModule,
    TeamMembersModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
