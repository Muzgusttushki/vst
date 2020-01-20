import { Injectable } from '@nestjs/common';
import { RedisService } from 'libs/redis/src';
import { StatisticWidgetDTO } from './DTO/statisticsWidgetDTO';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class StatisticsService {
    constructor(private readonly cacheService: RedisService) {}

    async getWidget(params: StatisticWidgetDTO, user: UserEntity) {
        
    }
}

