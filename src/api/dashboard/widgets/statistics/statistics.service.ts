import { Injectable } from '@nestjs/common';
import { RedisService } from 'libs/redis/src';
import { StatisticWidgetDTO } from './DTO/statisticsWidgetDTO';
import { UserEntity } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class StatisticsService {
    constructor(private readonly cacheService: RedisService,
        private readonly manager: EntityManager) { }

    async getWidget(params: StatisticWidgetDTO, user: UserEntity) {
        

        let operations = await this.manager.query(`select 
            (select count(id) from sheets where create_at >= ? and create_at <= ?) as previous,
            (select count(id) from sheets where create_at >= ? and create_at <= ?) as current`, 
            []);

        let transactions = await this.manager.query(`select 
            (select count(id) from sheets) as previous,
            (select count(id) from sheets) as current`);

        let products = await this.manager.query(`select 
            (select count(id) from sheets) as previous,
            (select count(id) from sheets) as current`);

        let sales = await this.manager.query(`select 
            (select count(id) from sheets) as previous,
            (select count(id) from sheets) as current`);

        let buyers = await this.manager.query(`select 
            (select count(id) from sheets) as previous,
            (select count(id) from sheets) as current`);


    }


    async getOperations(access) {
        const request = await this.manager.query(`select 
        (select count(id) from sheets) as previous,
        (select count(id) from sheets) as current`);
    }

    async getTransactions() { }
    async getProducts() { }
    async getSalesMoney() { }
    async getBuyers() { }
}

