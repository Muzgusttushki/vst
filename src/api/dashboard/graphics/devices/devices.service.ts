import { Injectable } from '@nestjs/common';
import { RedisService } from 'libs/redis/src';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DevicesGraphicsDTO } from './DTO/devicesGraphicsDTO';
import { devicesTypes } from './devices.types'
import { SheetStatus } from 'src/entities/types/sheetStatus.enum';

@Injectable()
export class DevicesService {
    constructor(private readonly cacheService: RedisService,
        private readonly manager: EntityManager
    ) { }

    async getGraphics(params: DevicesGraphicsDTO, account: UserEntity) {
        const firewall = { params, and: [account.campaigns_keys, 'graphics->devices'] };
        let values: any = await this.cacheService.getJson(firewall);
        if (values) return values;

        values = await this.manager.query(`
                SELECT os_name, status
                FROM sheets 
                WHERE access IN (?) AND create_at >= ? AND create_at <= ?`,
            [account.campaigns_keys, params.sdr, params.edr])
            .catch((error) => []);

        await this.cacheService.setexJson(firewall, values, 40);

        const transactions = [0, 0, 0],
            operations = [0, 0, 0];

        values.forEach((sheet: { status: SheetStatus, os_name: string }) => {
            const deviceID = devicesTypes.get(sheet.os_name);
            if (sheet.status == SheetStatus.widgetPayment) {
                transactions[deviceID]++;
            }
            operations[deviceID]++;
        });

        values = { transactions, operations };

        await this.cacheService.setexJson(firewall, values, 60);
        return values;
    }
}
