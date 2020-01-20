import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ActivityModule } from './api/dashboard/graphics/activity/activity.module';
import { EventsService } from './api/dashboard/graphics/events/events.service';
import { EventsModule } from './api/dashboard/graphics/events/events.module';
import { SignInModule } from './api/account/sign-in/sign-in.module';
import { SignUpModule } from './api/account/sign-up/sign-up.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShoppingEntity } from './entities/shopping.entity';
import { readFileSync } from 'fs';
import { SheetEntity } from './entities/sheet.entity';
import { UserEntity } from './entities/user.entity';
import { AccessEntity } from './entities/access.entity';
import { CampaignEntity } from './entities/campaign.entity';
import { AddressEntity } from './entities/address.entity';
import { RedisModule } from 'libs/redis/src';
import { RedisOptions } from 'ioredis';
import { LocationsModule } from './api/dashboard/graphics/locations/locations.module';
import { DevicesModule } from './api/dashboard/graphics/devices/devices.module';
import { BuyersModule } from './api/dashboard/graphics/buyers/buyers.module';
import { TicketsModule } from './api/dashboard/graphics/tickets/tickets.module';
import { StatisticsModule } from './api/dashboard/widgets/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'settings' }),
    TypeOrmModule.forRoot(((): TypeOrmModuleOptions => {
      const configService = new ConfigService();
      const config = {
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST', 'localhost'),
        port: configService.get<number>('MYSQL_PORT', 3306),
        username: configService.get<string>('MYSQL_USER', 'root'),
        password: configService.get<string>('MYSQL_PASS', ''),
        database: configService.get<string>('MYSQL_DB', 'db'),
        entities: [
          SheetEntity,
          ShoppingEntity,
          UserEntity,
          AccessEntity,
          CampaignEntity,
          AddressEntity
        ],
        synchronize: false,
      };

      if (configService.get<string>('MYSQL_SSL') == 'true')
        config['ssl'] = readFileSync(configService.get<string>('MYSQL_CA'))
          .toString();

      return config as TypeOrmModuleOptions;
    }).call(this)),

    RedisModule.forRoot(((): RedisOptions => {
      const configService = new ConfigService();
      const config: RedisOptions = {
        host: configService.get('REDIS_HOST', 'localhost'),
        port: Number.parseInt(configService.get('REDIS_PORT', '6337')),
        enableOfflineQueue: configService.get('REDIS_EOQ') === 'true'
      };

      if (configService.get<string>('REDISL_SSL') == 'true')
        config['ssl'] = {
          ca: readFileSync(configService.get<string>('REDISL_CA'))
            .toString()
        };

      return config as TypeOrmModuleOptions;
    }).call(this)),

    ActivityModule, EventsModule, SignInModule, SignUpModule, LocationsModule, DevicesModule, BuyersModule, TicketsModule, StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
