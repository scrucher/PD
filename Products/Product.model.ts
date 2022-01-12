import { Schema } from "mongoose";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Category, CategoryModel } from "../Category/category.model";
import { SubCategory, SubCategoryModel } from "../SubCategory/sub_category.model";




export class Product extends Schema {

    @prop()
    name: string;

    @prop()
    description: string;

    @prop({
        type: Number
    })
    price: number;

    @prop()
    image: string;

    @prop({
        ref: Category,
    })
    category_id: Ref<Category>;

    @prop({
        ref: "SubCategory",
    })
    subCategory_id: Ref<SubCategory>;
    

}

export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } })
