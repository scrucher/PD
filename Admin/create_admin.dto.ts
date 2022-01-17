import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdminDTO{
    @IsString()
    @IsOptional()
    username: string;

    // @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    first_name: string;

    @IsString()
    @IsOptional()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    password1: string;


    @IsString()
    @IsOptional()
    city: string; 

    @IsString()
    @IsOptional()
    phone: number;


    @IsString()
    @IsOptional()
    position: string;
        
    @IsString()
    @IsOptional()
    about: string;

    @IsString()
    @IsOptional()
    role: string;
}