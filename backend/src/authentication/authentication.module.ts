import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vendor } from "src/vendors/vendor.entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([Vendor]),],
        controllers: [AuthenticationController],
        providers: [AuthenticationService],
        exports: [AuthenticationService]
    }
)
export class AuthenticationModule {

}