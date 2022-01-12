import { getModelForClass, prop, Ref } from "@typegoose/typegoose"
import { Schema } from "mongoose"
import { Product } from "./Product.model";


export class Characteristics extends Schema{

    @prop()
    public char_name: string;

    @prop()
    public char_price: number;

    @prop({
        ref: "ProductModel",
    })
    public product_id: Ref<Product>;
}
export const CharacteristicsModel = getModelForClass(Characteristics, {schemaOptions: { timestamps: true } })