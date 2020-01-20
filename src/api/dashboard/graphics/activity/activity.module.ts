import { Module, HttpModule } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetEntity } from 'src/entities/sheet.entity';
import { ShoppingEntity } from 'src/entities/shopping.entity';
import { RedisModule } from 'libs/redis/src';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],

  imports: [
    TypeOrmModule.forFeature([
      SheetEntity,
      ShoppingEntity
    ]),

    RedisModule
  ]
})
export class ActivityModule {}
