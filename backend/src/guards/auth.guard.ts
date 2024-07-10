import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthRequest } from 'src/booking/booking.controller';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService
    ) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest<AuthRequest>();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        console.log(authHeader.split(' '))
        const [vendorId, vendorName, secretKey] = authHeader.split(' ');
        // Validate the token here (e.g., using a JWT library)

        if (!vendorId || !vendorName || !secretKey) {
            throw new UnauthorizedException('Invalid token');
        }

        const vendor = await this.authenticationService.findVendor(vendorId, vendorName, secretKey);
        if (!vendor) {
            throw new UnauthorizedException('Vendor does not exist');
        }
        request.vendor = vendor;

        return true;
    }
}
