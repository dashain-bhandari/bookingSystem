import { Controller, Get, HttpException, Post, Req } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";


@Controller('authentication')
export class AuthenticationController {

    constructor(
        private authenticationService: AuthenticationService
    ) { }
    @Post('register')
    async registerVendor(@Req() request:Request) {
        try {
            const body=request.body;
            const data = await this.authenticationService.register(body);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message,500);
        }
    }


}