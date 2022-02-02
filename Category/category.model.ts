import { Schema } from "mongoose";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { SubCategory, SubCategoryModel } from "../SubCategory/sub_category.model";
import { Product, ProductModel } from "../Products/Product.model";




export class Category extends Schema {

    @prop()
    public category_name: string;

    @prop({
        ref: "SubCategoryModel"
    })
    public subCategory_id: Ref<SubCategory>[]

    @prop({
        ref: "ProductModel"
    })
    public product_id: Ref<Product>[]



}

export const CategoryModel = getModelForClass(Category, { schemaOptions: { timestamps: true } })
