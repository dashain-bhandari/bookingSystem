import { Booking } from 'src/booking/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Vendor {
    @PrimaryColumn('uuid')
    id:string;

    @Column()
    vendorId: string;

    @Column()
    vendorName: string;

    @Column({nullable:true})
    vendorEmail: string;

    @Column()
    secretKey: string;

    @OneToMany(()=>Booking, (booking)=>booking.vendor)
    bookings:Booking;

    @BeforeInsert()
    generateUUID() {
        this.id = uuidv4();
      }
}