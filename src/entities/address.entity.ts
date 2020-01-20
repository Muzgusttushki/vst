import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('addresses')
export class AddressEntity {
    @PrimaryColumn('varchar', { length: 64 })
    address4: string;

    @Column('varchar', { length: 128 })
    country: string;

    @Column('varchar', { length: 128 })
    city: string;

    @Column('varchar', { length: 128 })
    region: string;

    @Column('varchar', { length: 128 })
    timezone: string;

    @Column('int')
    zipcode: number;
}