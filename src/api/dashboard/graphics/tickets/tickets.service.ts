import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RedisService } from 'libs/redis/src';
import { TicketsGraphicsDTO } from './DTO/ticketsGraphicsDTO';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class TicketsService {
    constructor(private readonly cacheService: RedisService,
        private readonly manager: EntityManager) { }

    async getGraphics(params: TicketsGraphicsDTO, account: UserEntity) {
        const firewall = { params, and: [account.campaigns_keys, 'graphics->tickets'] };
        let values: any = await this.cacheService.getJson(firewall);
        if (values) return values;

        const sheets = await this.manager.query(`SELECT s.quantity FROM sheets 
            LEFT JOIN shopping s ON sheets.id = s.sheetId WHERE sheets.status = 7 
            AND sheets.create_at >= ? AND sheets.create_at <= ? AND sheets.access in (?)
            AND quantity is not null`, [
            params.sdr, params.edr, account.campaigns_keys
        ]);

        values = [0, 0, 0, 0, 0];
        sheets.forEach((sheet: { quantity: number }) =>
            values[sheet.quantity >= 5 ? 4 : sheet.quantity - 1 || 0]++);


        await this.cacheService.setexJson(firewall, values, 30);
        return values;
    }
}
