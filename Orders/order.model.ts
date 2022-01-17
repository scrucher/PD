import { Schema } from "mongoose";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Product } from "../Products/Product.model";
// import { User } from "../Users/Users.model";



export class Order extends Schema {



    @prop({
        type: String,
        enum: ["In Progress", "On The Way", "Arrived"]
    })
    status: string;

    @prop()
    total_price: string


    // @prop({ ref: "UserModel" })
    // public client: Ref<User>;

        // @prop({ ref: "CharasteristicModel" })
    // public client: Ref<Charasteristics>;


    @prop({ ref: "ProductModel" })
    public products: Ref<Product>[];

}

export const OrderModel = getModelForClass(Order, { schemaOptions: { timestamps: true } })
