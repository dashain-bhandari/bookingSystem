import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { BookingModule } from './booking/booking.module';
import { Vendor } from './vendors/vendor.entity';
import { Booking } from './booking/booking.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: "postgresql://postgres.auhfmlnivaktedneulxb:J8xKncx@123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
    entities: [Vendor,Booking],
    synchronize: true,
    logging: true,
  }),
    AuthenticationModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
