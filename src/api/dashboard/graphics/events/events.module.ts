import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetEntity } from 'src/entities/sheet.entity';
import { ShoppingEntity } from 'src/entities/shopping.entity';
import { RedisModule } from 'libs/redis/src';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([
      SheetEntity,
      ShoppingEntity
    ]),

    RedisModule
  ]
})
export class EventsModule { }
