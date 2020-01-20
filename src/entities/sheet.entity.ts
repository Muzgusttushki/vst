import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { uuid } from './helpers/uuid';
import { ShoppingEntity } from './shopping.entity';

@Injectable()
@Entity('sheets')
export class SheetEntity {
    @PrimaryColumn('uuid')
    id: string;
    
    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
    create_at: Date;

    @Column({ nullable: false, type: 'uuid' })
    access: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    payment_name: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    payment_email: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    payment_phone: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    payment_type: string;

    @Column({ nullable: true, type: 'tinyint' })
    payment_gender: number;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tag_content: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tag_placement: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tag_compaign: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tag_term: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tag_medium: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tag_source: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    os_name: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    os_arch: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    address4: string;

    @Column({ nullable: false, type: 'tinyint', default: 0 })
    status: number;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    ga: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    fb: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    vs: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    ya: string;

    @Column({ nullable: true, type: 'varchar', length: 512 })
    source: string;

    @Column({ nullable: true, type: 'varchar', length: 2048 })
    url: string;

    @Column({ nullable: true, type: 'varchar', length: 256 })
    event_name: string;

    @Column({ nullable: true, type: 'datetime' })
    event_date: Date;

    @Column({ nullable: true, type: 'bigint' })
    event_id: number;

    @OneToMany(x => ShoppingEntity, x => x.sheet)
    shopping_list: ShoppingEntity[]
}