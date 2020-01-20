import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity';
import { AccessEntity } from './access.entity';


@Entity('campaigns')
export class CampaignEntity {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column('varchar', { length: 128 })
    name: string = undefined;

    @Column('uuid')
    service_key: string = undefined;

    @Column('int')
    balance: number = undefined;

    @Column('bool')
    enable: boolean = undefined;
}   