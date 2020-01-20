import { Injectable } from '@nestjs/common';
import { RedisService } from 'libs/redis/src';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { BuyersGraphicsDTO } from './DTO/buyersGraphicsDTO';

@Injectable()
export class BuyersService {
    constructor(private readonly cacheService: RedisService,
        private readonly manager: EntityManager) { }

    async getGraphics(params: BuyersGraphicsDTO, account: UserEntity) {
        const firewall = { params, and: [account.campaigns_keys, 'graphics->buyers'] };
        let state: any = await this.cacheService.getJson(firewall);
        if (state) return state;

        const values: [{ current: number, total: number }] = await this.manager.query(`SELECT
            (SELECT COUNT(id) FROM sheets WHERE status = 7
                AND access IN (?)
                AND create_at >= ? AND create_at <= ?) as current,
            (SELECT COUNT(id) FROM sheets WHERE status = 7 AND access IN (?)) as total`,
            [account.campaigns_keys, params.sdr, params.edr, account.campaigns_keys])
            .catch((error) => [{ current: 0, total: 0 }]);

        const data = values[0];
        state = {
            share: Math.round(100 / data.total * data.current),
            total: data.total,
            current: data.current
        }

        await this.cacheService.setexJson(firewall, state, 30);
        return state;
    }
}
