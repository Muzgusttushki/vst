import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { RedisModule } from 'libs/redis/src';

@Module({
  providers: [StatisticsService],
  controllers: [StatisticsController],
  imports: [


    RedisModule
  ]
})
export class StatisticsModule {}
