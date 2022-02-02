import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CharDto } from "../Charcteristics/characteristics.dto";

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

    @IsArray()
    @IsOptional()
    charachteristics: CharDto[];

    @IsNotEmpty()
    category_id: string;

    @IsNotEmpty()
    subCategory_id: string;
}