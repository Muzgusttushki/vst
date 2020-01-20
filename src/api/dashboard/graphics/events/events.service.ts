import { Injectable } from '@nestjs/common';
import { EventsGraphicsDTO } from './DTO/EventsGraphicsDTO';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetEntity } from 'src/entities/sheet.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'libs/redis/src';
import { SheetStatus } from 'src/entities/types/sheetStatus.enum';

@Injectable()
export class EventsService {
    constructor(@InjectRepository(SheetEntity)
    private readonly sheetsRepository: Repository<SheetEntity>,
        private readonly cacheService: RedisService) { }

    async getGraphics(params: EventsGraphicsDTO, account: UserEntity) {
        const firewall = { params, and: [account.campaigns_keys, 'graphics->events'] };
        let values: any = await this.cacheService.getJson(firewall);
        if (values) return values;

        let points = new Array(10).fill(0);

        const sheets: [] = await this.sheetsRepository.createQueryBuilder()
            .select(['event_name', 'sum(1) quantity'])
            .where({ status: SheetStatus.widgetPayment })
            .andWhere('access in (:keys)')
            .andWhere('create_at >= :sdr')
            .andWhere('create_at <= :edr')
            .groupBy('event_name')
            .orderBy('quantity', 'DESC')
            .setParameters({ ...params, keys: account.campaigns_keys })
            .execute()
            .catch(() => []);

        if (sheets.length) {
            const totalSales = sheets.reduce((p, c) => p + parseInt(c['quantity']), 0);
            points = points.map((_, pointID) => {
                const share = (100 / totalSales * parseInt(sheets[pointID]['quantity']))
                    .toFixed(1);

                return {
                    name: sheets[pointID]['event_name'],
                    quantity: sheets[pointID]['quantity'],
                    share
                };
            });
        }

        await this.cacheService.setexJson(firewall, points, 60);
        return points;
    }
}
