import { Request, Response } from "express";
import { UserDto } from "./user.dto";
import { UserModel } from "./user.model";
import * as bcrypt from "bcrypt";
import { Payload } from "../Utilities/payload";
import GenerateTK from "../Utilities/GenerateTK";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";


export class UserController{
    async CreateStore(req: Request, res: Response) {
        const
            { username,
                email,
                phone,
                city,
                adress,
                image,
                password,
                location
            } : UserDto = req.body;
        const found = await UserModel.findOne().or([{"username": username}, {"email": email}])
        if (found) {
            console.log(found)
            return res.status(300).json({"err":"Account Already Exist"})
        } else {
            const user = new UserModel;
            user.username = username;
            user.password = await bcrypt.hash(password, 10)
            user.email = email;
            user.phone = phone;
            user.city = city;
            user.image = image;
            user.adress = adress;
            user.location = location;
            const saved = await user.save()
                .then(data => data)
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({"err": "Internal Server Error"})
                }
                );
            const payload: Payload = {
                username: user.username,
                password: user.password
            }
            const token: string = GenerateTK(payload);
            return ({ token: token });
        }
    }

    public static async Login(req : Request, res: Response) {
        const user = plainToClass(Payload, req.body);
        await validate(user ,{ skipMissingProperties: true })
        .then(async (errors) => {
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                console.log(errorTexts);
                return res.render('Templates/Login.ejs',{"error": errorTexts});
            } else {
                try{
                    const found = await UserModel.findOne().or([{username:user.username}, {email: user.username}]).then(data =>data)
                    .catch(err => {
                        console.log(err);
                        res.render('Templates/Login.ejs',{"error":"Internal Server Error"})
                    });
                    console.log({"found:":found});
                    if (found){
                        try {
                            
                            const paswd = found.password;
                            const checked = await bcrypt.compare(user.password, paswd)
                            if (checked ) {
                                const payload: Payload = {
                                    username :user.username,
                                    password: user.password
                                }
                                const token: string = GenerateTK(payload);
                                return res.setHeader("access_token", token)
                                    .cookie(
                                        "access_token",
                                        token, {
                                            httpOnly: true,
                                            maxAge: 90000000,
                                            secure: true,
                                            //@ts-igonre
                                            // overwrite: true
                                            
                                    }
                                    )
                                    .render('Templates/User/Profile.ejs', { "user": found })
                            }else{
                                return res.render('Templates/Login.ejs',{"error":"Make Sure You Do Remeber Your email or password"})
                            }
                        }catch(err){
                            console.log(err)
                            return res.render('Templates/Login.ejs',{"error":"Something Went Wrong"})
                        }

                    }else{
                        return res.render('Templates/Login.ejs',{"error":'User With Credentials Doesnt Exist'})
                    }
                }catch(error: any){
                    return res.render('Templates/Login.ejs',{"error":"Bad Request"})
                }
            }});
         return res;
    }

    async getAllStores() {
        const found = await UserModel.find()
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })
            
        return found;
    }

    async getStoreById(): Promise<User> {
        const id = ""
        const found = await UserModel.findById(id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return ("Internal Server error");
            })

        return found;
        
    }

    async deleteUser(id: string): Promise<any> {
        let deleted;
        try {
            deleted = await UserModel.deleteOne({ _id: id })
        } catch (err) {
            throw new InternalServerError('Internal Server Error')
        }
        if (deleted.deletedCount === 1) return "User Deleted Successfully";
    }

    async updateUser(id: string, userInput: UserInput) {
        const data = userInput;
        let updated;
        {
            updated = await UserModel.updateOne({ _id: id }, data, {
                upsert: true,
            })
        }
        return updated;
        }

        // async updateUserLocation(locationInput: LocationInput, context: Context) {
        //     //@ts-ignore
        //     const _id  =  "61bb4d6074befd339f97d521";
        //     const { type, coordinates } = locationInput;
        //     const user = new UserModel();
        //     let updated
        //     try {
        //         user.type = type;
        //         user.coordinates = coordinates;
        //         updated =
        //             UserModel.updateOne(user).where("_id", _id);
        //     } catch (err) {
        //         console.log(err)
        //     }
        //     console.log(updated)
        //     return updated;
        // }

        
}