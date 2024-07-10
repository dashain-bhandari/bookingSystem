import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vendor } from "src/vendors/vendor.entity";
import { Repository } from "typeorm";
import * as crypto from 'crypto'

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(Vendor) private vendorRepository: Repository<Vendor>
    ) { }

    async register(reqBody: any): Promise<Vendor> {
        try {
            const { vendorName, vendorEmail } = reqBody;
            console.log(vendorName)
            const vendorId = vendorName + crypto.randomBytes(3).toString('hex')
            const secretKey = crypto.randomBytes(10).toString('hex')
            const vendor = this.vendorRepository.create({ vendorId, vendorName, vendorEmail, secretKey });
            await this.vendorRepository.save(vendor);
            return vendor;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500);
        }
    }


    async findVendor(vendorId: string, vendorName: string, secretKey: string) {
        try {
            const vendor = await this.vendorRepository.findOne({ where: { vendorName, vendorId, secretKey } });
            return vendor
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500)
        }
    }
}