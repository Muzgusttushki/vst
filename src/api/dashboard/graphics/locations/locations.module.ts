import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetEntity } from 'src/entities/sheet.entity';
import { RedisModule } from 'libs/redis/src';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [
    TypeOrmModule.forFeature([
      SheetEntity
    ]),

    RedisModule
  ]
})
export class LocationsModule {}
