import { Schema } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";




export class Admin extends Schema {
    @prop()
    public username: string;

    @prop()
    public email: string;

    @prop()
    public first_name: string;

    @prop()
    public last_name: string;

    @prop()
    public password: string;

    @prop()
    public city: string;

    @prop()
    public about: string;

    @prop()
    public phone: number;

    @prop()
    public position: string;

}

export const AdminModel = getModelForClass(Admin, { schemaOptions: { timestamps: true } })
