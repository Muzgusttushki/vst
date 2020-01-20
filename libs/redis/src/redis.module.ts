import { Module, DynamicModule, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisOptions } from 'ioredis';

@Global()
@Module({
})
export class RedisModule {
  static forRoot(configure: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [{
        provide: 'Redis',
        useValue: configure
      }, RedisService],
      exports: [RedisService]
    }
  }
}
