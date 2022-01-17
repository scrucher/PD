import { Schema } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";



export class User extends Schema {


    @prop()
    public username: string;

    @prop()
    public email: string;

    @prop()
    public password: string;

    @prop()
    public salt: string;

    @prop()
    public phone: string

    @prop()
    public country: string

    @prop()
    public region: string

    @prop()
    public city: string

    @prop()
    public adress: string

    @prop()
    image: string

    @prop({
        type: [Number],
        required: true,
    })
    location: number[];


}

export const UserModel = getModelForClass(User, {schemaOptions: {timestamps: true}})
