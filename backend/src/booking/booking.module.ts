import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { AuthenticationModule } from "src/authentication/authentication.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";

@Module({
    imports: [AuthenticationModule,TypeOrmModule.forFeature([Booking]),],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService]
})

export class BookingModule {
}