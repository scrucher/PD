import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;


    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    city: string

    @IsOptional()
    @IsString()
    adress: string
    
    @IsOptional()
    @IsString()
    image: string

    location: number[];

}