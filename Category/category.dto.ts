import { IsNotEmpty, IsString } from "class-validator";

export class CatgoryDTO {
    @IsString()
    @IsNotEmpty()
    category_name: string;
}