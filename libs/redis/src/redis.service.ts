import { Injectable, Inject, Logger } from '@nestjs/common';
import * as Redis from 'ioredis';
import { createHash } from 'crypto';

@Injectable()
export class RedisService extends Redis {
    constructor(@Inject('Redis') options: Redis.RedisOptions) {
        super(options);
    }

    private toHash<T>(obj: T) {
        return createHash('md5')
            .update(JSON.stringify(obj))
            .digest('hex')
    }

    setexJson<T, A>(key: T, value: A, seconds: number): Promise<"OK"> {
        const hash = this.toHash(key);
        return this.setex(hash, seconds, JSON.stringify(value));
    }

    async getJson<T>(key: T): Promise<JSON> {
        const hash = this.toHash(key);
        return JSON.parse(await this.get(hash));
    }

    setJson<T, A>(key: T, value: A): Promise<string> {
        const hash = this.toHash(key);
        return this.set(hash, JSON.stringify(value));
    }
}
