import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SignInDTO } from './DTO/SignInDTO';
import { EchoState } from 'src/express/echo-state';
import { APICodes } from 'src/express/message-codes';
import { JwtService } from '@nestjs/jwt';
import { JWTAccountDTO } from 'src/account/DTO/jwtAccountDTO';
import { UserEntity } from 'src/entities/user.entity';
import { SheetEntity } from 'src/entities/sheet.entity';
import { AccessEntity } from 'src/entities/access.entity';
import { CampaignEntity } from 'src/entities/campaign.entity';

@Injectable()
export class SignInService {
    config = new ConfigService();
    jwtService = new JwtService({
        secret: process.env['JWT_SECRET'],
        signOptions: { expiresIn: process.env['JWT_EXP'] }
    });

    constructor(@InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>) {
        this.create();
    }

    async create() {

    }

    async signIn(query: SignInDTO): Promise<EchoState<string>> {
        const _eq = createHmac('sha256', this.config.get<string>("JWT_ACCESS"))
            .update(query.password)
            .digest('hex');

        const account = await this.usersRepository.createQueryBuilder()
            .where("email = :email")
            .andWhere("eq = :eq")
            .setParameters({ email: query.email, eq: _eq })
            .getOne()
            .catch((): UserEntity => null);

        if (!account) return { error: true, code: APICodes.wrongPass }
        if (account.enable) {
            const state = await this.jwtService.signAsync({
                id: account.id,
                service: account.service_key
            });

            return { code: APICodes.success, state }
        }

        return { error: true, code: APICodes.userIsBlock }
    }

    async fingerprint(params: JWTAccountDTO): Promise<UserEntity> {
        try {
            const query = this.usersRepository
                .createQueryBuilder('user')
                .innerJoinAndSelect(AccessEntity, 'access', 'access.user = user.service_key')
                .leftJoinAndSelect(CampaignEntity, 'campaigns', 'campaigns.service_key = access.company')
                .where({ id: params.id, service_key: params.service })

            const request = await query.execute();
            const users: UserEntity[] = [];

            request.forEach((sheet: Object) => {
                let user = users.find(x => x.id === sheet['user_id']);

                if (user === undefined) {
                    user = new UserEntity();
                    Object.keys(user).forEach(label => {
                        user[label] = sheet[`user_${label}`]
                    });

                    users.push(user);
                }

                if (user.campaigns === undefined) {
                    user.campaigns = new Array<CampaignEntity>();
                }

                let campaign = user.campaigns.find(x => x.id === sheet['campaign_id']);

                if (campaign === undefined) {
                    campaign = new CampaignEntity();
                    Object.keys(campaign).forEach(label => {
                        campaign[label] = sheet[`campaigns_${label}`]
                    });

                    const service_key = sheet['campaigns_service_key'];
                    user.campaigns_keys ?
                        user.campaigns_keys.push(service_key) :
                        user.campaigns_keys = [service_key]

                    user.campaigns.push(campaign);
                }
            })

            return users.shift();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
