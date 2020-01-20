import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityGraphicsDTO } from './DTO/ActivityGraphicsDTO';
import { SheetEntity } from 'src/entities/sheet.entity';
import { UserEntity } from 'src/entities/user.entity';
import { timeMap } from 'src/utils/enumerableTime';
import { RedisService } from 'libs/redis/src';
import { SheetStatus } from 'src/entities/types/sheetStatus.enum';

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(SheetEntity)
    private readonly sheetsRepository: Repository<SheetEntity>,
        private readonly cacheService: RedisService) { }

    async getGraphics(params: ActivityGraphicsDTO, account: UserEntity) {
        const firewall = { params, and: [account.campaigns_keys, 'graphics->activity'] };
        let values: any = await this.cacheService.getJson(firewall);
        if (values) return values;

        const pointers = timeMap(params.sdr,
            params.edr, 24);

        const state = await Promise.all([
            this.transactionsAndOperationsList(params, pointers, account.campaigns_keys),
            this.uniqieCustomerList(params, pointers, account.campaigns_keys),
            this.ticketsQuantity(params, pointers, account.campaigns_keys),
        ]);

        values = [pointers, state[0][0], state[0][1], state[1], state[2]];
        await this.cacheService.setexJson(firewall, values, 60);
        return values;
    }

    /**
     * @param {ActivityGraphicsDTO} params
     * @param {Date[][]} pointers
     * @param {string[]} keys
     * @returns {Promise<Array<number>>}
     * @memberof ActivityService
     * @description array number of buyers was allocated during the period
    */
    private async uniqieCustomerList(params: ActivityGraphicsDTO, pointers: Date[][], keys: string[]): Promise<Array<number>> {
        const values: number[] = new Array(pointers.length).fill(0);
        const sheets = await this.sheetsRepository.createQueryBuilder()
            .select(["MIN(create_at) create_at"])
            .where({ status: SheetStatus.widgetPayment })
            .andWhere("access IN (:keys)")
            .andWhere("create_at >= :sdr")
            .andWhere("create_at <= :edr")
            .groupBy("payment_phone")
            .setParameters({ ...params, keys })
            .execute()
            .catch(() => []);

        sheets.forEach((sheet: { create_at: Date }) => {
            pointers.forEach((point, pointID) => {
                if (point[0].getTime() <= sheet.create_at.getTime() &&
                    point[1].getTime() >= sheet.create_at.getTime()) {
                    values[pointID]++;
                }
            });
        });

        return values;
    }

    /**
     * @private
     * @param {ActivityGraphicsDTO} params
     * @param {Date[][]} pointers
     * @param {string[]} keys
     * @returns {Promise<Array<number>>}
     * @memberof ActivityService
     * @description array of the number of tickets that fell in the period
     */
    private async ticketsQuantity(params: ActivityGraphicsDTO, pointers: Date[][], keys: string[]): Promise<Array<number>> {
        const values = new Array(pointers.length).fill(0);

        const sheets = await this.sheetsRepository.createQueryBuilder("action")
            .innerJoinAndSelect("action.shopping_list", "shopping.transaction")
            .select(["action.create_at",
                "shopping.transaction.quantity"])
            .where({ status: SheetStatus.widgetPayment })
            .andWhere("action.access IN (:keys)")
            .andWhere("action.create_at <= :edr")
            .andWhere("action.create_at >= :sdr")
            .setParameters({ keys, ...params })
            .getMany()
            .catch((): SheetEntity[] => []);

        sheets.forEach(sheet => {
            if (sheet.shopping_list.length) {
                pointers.forEach((point, pointID) => {
                    if (point[0].getTime() <= sheet.create_at.getTime() &&
                        point[1].getTime() >= sheet.create_at.getTime()) {
                        values[pointID] = sheet.shopping_list.reduce((previous, current) =>
                            previous + current.quantity, values[pointID])
                    }
                });
            }
        });

        return values;
    }

    /**
     * @private
     * @param {ActivityGraphicsDTO} params
     * @param {Date[][]} pointers
     * @param {string[]} keys
     * @returns {Promise<Array<number[][]>>}
     * @memberof ActivityService
     */
    private async transactionsAndOperationsList(params: ActivityGraphicsDTO, pointers: Date[][], keys: string[]):
        Promise<Array<number[][]>> {
        const transactionValues = new Array(pointers.length).fill(0),
            operationValues = new Array(pointers.length).fill(0);

        const sheets = await this.sheetsRepository.createQueryBuilder()
            .select(['create_at', 'status'])
            .where("access IN (:keys)")
            .andWhere("create_at <= :edr")
            .andWhere("create_at >= :sdr")
            .setParameters({ keys, ...params })
            .execute() as SheetEntity[];

        sheets.forEach(sheet => {
            pointers.forEach((point, pointID) => {
                if (point[0].getTime() <= sheet.create_at.getTime() &&
                    point[1].getTime() >= sheet.create_at.getTime()) {
                    if (sheet.status === SheetStatus.widgetPayment) {
                        transactionValues[pointID]++;
                    }

                    operationValues[pointID]++;
                }
            });
        });

        return [transactionValues, operationValues];
    }
}
