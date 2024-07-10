import { Vendor } from "src/vendors/vendor.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Booking {
@PrimaryColumn('uuid')
id:string


@ManyToOne(()=>Vendor,(vendor)=>vendor.bookings)
vendor:Vendor

@Column()
fullname:string

@Column()
email:string

@Column()
pName:string

@Column()
pEmail:string

@Column()
pCode:string

@Column()
pNumber:string

@Column()
pNationality:string

@Column()
pPassportNo:string

@Column({nullable:true})
pDob:Date

@Column()
departureDate:Date

@Column()
noOfTravelers:number

@Column({nullable:true})
price:number

@Column()
tripDuration:number

@Column({nullable:true})
notes:string

@Column('json')
package:object

@Column({default:"active", enum:["active","canceled"]})
status:string

@Column({default:"unpaid", enum:["fullyPaid","partiallyPaid","unpaid"]})
paymentStatus:string

@BeforeInsert()
generateUUID() {
    this.id = uuidv4();
  }

}