import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDTO{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    image: string;

    @IsNotEmpty()
    category_id: string;

    @IsNotEmpty()
    subCategory_id: string;
}