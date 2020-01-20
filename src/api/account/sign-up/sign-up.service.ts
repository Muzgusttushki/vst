import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpDTO } from './DTO/SignUpDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class SignUpService {
    config = new ConfigService();

    constructor(@InjectRepository(UserEntity)
    private readonly _usersEntity: Repository<UserEntity>) { }

    private async SignUp(_signUpQuery: SignUpDTO) {
        const _eq = createHmac('sha256', this.config.get<string>("ACCESS_KEY"))
            .update(_signUpQuery.password)
            .digest('hex');
        
    }
}
