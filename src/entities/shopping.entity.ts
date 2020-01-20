import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { SheetEntity } from "./sheet.entity";
import { AddressEntity } from "./address.entity";

@Entity('shopping')
export class ShoppingEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
    create_at: Date;

    @Column({ nullable: true, type: 'uuid' })
    access: string;

    @Column('int', { nullable: true })
    ref: number;

    @Column('int', { default: 0, nullable: true })
    quantity: number;

    @Column('int', { default: 0, nullable: true })
    price: number;

    @Column('int', { default: 0, nullable: true })
    discount_value: number;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    discount_type: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    variant: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    tariff: string;

    @ManyToOne(type => SheetEntity, x => x.shopping_list)
    sheet: SheetEntity
}