import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { Admin, AdminModel } from "./Admin.model";



export class Token extends Schema{
    @prop({
        ref: AdminModel,
    })
    user_id: Ref<Admin>
    @prop({
        type: Date,
    })
    expires_In: Date;
}

export const TokenModel = getModelForClass(Token, {
    schemaOptions: {
        timestamps: true,
    }
}) 