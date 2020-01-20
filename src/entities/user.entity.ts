import { PrimaryColumn, PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { CampaignEntity } from "./campaign.entity";
import { AccessEntity } from "./access.entity";
import { toArray } from "src/utils/typeorm/to-array.decorator";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number = undefined;

    @Column('varchar', { length: 256 })
    email: string = undefined;

    @Column('varchar', { length: 128 })
    name: string = undefined;

    @Column('varchar', { length: 64 })
    eq: string = undefined;

    @Column('uuid')
    service_key: string = undefined;

    @Column('int')
    role: number = undefined;

    @Column('bool')
    enable: boolean = undefined;

    campaigns: CampaignEntity[];
    campaigns_keys: string[];
}