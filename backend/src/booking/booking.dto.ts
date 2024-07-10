import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class BookingDto{
    @IsEmail()
    email: string;
  
    @IsEmail()
    pEmail: string;
  
    @IsNotEmpty()
    fullname: string;

    @IsNotEmpty()
    pCode: string;

    @IsNotEmpty()
    pNumber: string;

    @IsNotEmpty()
    pNationality: string;

    @IsNotEmpty()
    pPassportNo: string;

    @IsNumber()
    tripDuration: number;

    @IsNumber()
    noOfTravelers:number;

}