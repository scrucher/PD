import { Schema } from "mongoose";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product, ProductModel } from "../Products/Product.model";
import { Category, CategoryModel } from "../Category/category.model";




export class SubCategory extends Schema {

    @prop()
    subCategory_name: string;

    @prop({
        ref: "ProductModel",
    })
    product_id: Ref<Product>[];

    @prop({
        ref: "CategoryModel",
    })
    category_id: Ref<Category>





}

export const SubCategoryModel = getModelForClass(SubCategory, { schemaOptions: { timestamps: true } })
