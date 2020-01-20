import * as Express from 'express';
import { UserEntity } from 'src/entities/user.entity';

export interface Request extends Express.Request {
    user: UserEntity
}