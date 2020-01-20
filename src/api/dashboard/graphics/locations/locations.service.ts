import { Injectable } from '@nestjs/common';
import { LocationsGraphicsDTO } from './DTO/locationsGraphicsDTO';
import { UserEntity } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';
import { RedisService } from 'libs/redis/src';
import { SheetStatus } from 'src/entities/types/sheetStatus.enum';

@Injectable()
export class LocationsService {
    constructor(private readonly manager: EntityManager,
        private readonly cacheService: RedisService) { }

    async getGraphics(params: LocationsGraphicsDTO, account: UserEntity) {
        const firewall = { params, and: [account.campaigns_keys, 'graphics->locations'] };
        let values: any = await this.cacheService.getJson(firewall);
        if (values) return values;

        values = await this.manager.query(`SELECT sum(1) quantity, city name FROM sheets
            INNER JOIN addresses ON addresses.address4 = sheets.address4 
            WHERE status = ? AND create_at >= ? AND create_at <= ? AND access in (?)
            AND addresses.city is not null AND sheets.address4 is not null
            GROUP BY name
            ORDER BY quantity DESC
            LIMIT ?`, [SheetStatus.widgetPayment, params.sdr, params.edr, account.campaigns_keys, params.views]);

        await this.cacheService.setexJson(firewall, values, 10);
        return values;
    }
}
