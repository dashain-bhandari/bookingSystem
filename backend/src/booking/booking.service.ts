import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { BookingDto } from "./booking.dto";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>
    ) {

    }
    async createBooking(data:any) {
        try {
            const booking = this.bookingRepository.create(data);
            await this.bookingRepository.save(booking);
            return booking;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500);
        }
    }

    async cancelBooking(bookingId: string) {
        try {
            let booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
            booking.status = "canceled"
            await this.bookingRepository.save(booking);
            return booking;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500);
        }
    }

    async getAllBookings() {
        try {
            const bookings = this.bookingRepository.find({ relations: ["vendor"] });
            return bookings
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500);
        }
    }

    async getVendorBooking(vendorId: string) {
        try {
            const data = await this.bookingRepository.find({ where: { vendor: { vendorId } }, relations: ["vendor"] });
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500)
        }
    }


    async deleteBookings(id: string) {
        try {
            const data = await this.bookingRepository.delete(id);
            console.log(data);
            return data;

        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500);
        }
    }
}