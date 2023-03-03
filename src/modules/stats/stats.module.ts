import { Module } from '@nestjs/common';
import { StatsResolver } from './stats.resolver';
import { StatsService } from './stats.service';
import { PrismaService } from '../../prisma/PrismaService';

@Module({
  providers: [StatsResolver, StatsService, PrismaService],
})
export class StatsModule {}
