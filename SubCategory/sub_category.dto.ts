import { IsNotEmpty, IsString } from "class-validator";

export class SubCategoryDTO{
    @IsString()
    @IsNotEmpty()
    subCategory_name: string;

    @IsNotEmpty()
    category_id: string;

    @IsNotEmpty()
    image: string;
}