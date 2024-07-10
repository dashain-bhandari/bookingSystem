import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Vendor } from "src/vendors/vendor.entity";
import { Request } from "express";
import { BookingDto } from "./booking.dto";

export interface AuthRequest extends Request {
    vendor: Vendor
}
@Controller('booking')
export class BookingController {
    constructor(
        private bookingService: BookingService
    ) {

    }

    @Post('')
    @UseGuards(AuthGuard)
    async createBooking(@Req() request: AuthRequest, @Body() bookingData:BookingDto) {
        try {
            const data = await this.bookingService.createBooking({ ...bookingData, vendor: request.vendor })
            console.log(data);
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500);
        }
    }


    @Get()
    async getAllBookings() {
        try {
            const data = await this.bookingService.getAllBookings()
            console.log(data);
            return data
        } catch (error) {
            console.log(error.message);
        }
    }


    @Get('vendor')
    @UseGuards(AuthGuard)
    async getVendorBookings(@Req() request:AuthRequest) {
        try {
            let vendorId=request?.vendor?.vendorId
            const data = await this.bookingService.getVendorBooking(vendorId)
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message,500);
        }
    }


    @Patch(':bookingId')
    async cancelBooking(@Param('bookingId') bookingId: string) {
        try {
            const data = await this.bookingService.cancelBooking(bookingId)
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message, 500)
        }
    }


    @Delete(':bookingId')
    async deleteBooking(@Param('bookingId') bookingId:string) {
        try {
            const data = await this.bookingService.deleteBookings(bookingId);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message,500);
        }
    }
}