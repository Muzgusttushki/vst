import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { CampaignEntity } from "./campaign.entity";

@Entity('accesses')
export class AccessEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('uuid')
    company: string;

    @Column('uuid')
    user: string;
}