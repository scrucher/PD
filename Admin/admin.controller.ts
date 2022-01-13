import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import {TokenModel} from "./token.model";
// import SendMail from "../../middlewares/send_mail.midlleware";
// import { v4 } from "uuid";
import GenerateTK from "../Utilities/GenerateTK";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateAdminDTO } from "./create_admin.dto";
import { AdminModel } from "./Admin.model";
import decode_token from "../Utilities/decode_token";
import { Payload } from "../Utilities/payload";
import * as dotenv from "dotenv";
dotenv.config();

export class AdminController {


    // Create Admin Method

    public static async CreateAdmin (req: Request, res: Response){
        console.log(req.body);
        const admin = plainToClass(CreateAdminDTO, req.body);
        console.log(admin);
        
        if (admin.password !== admin.password1) return res.json({error: "Paswword Do Not Match"})
        const existed = await AdminModel.findOne({email: admin.email})
        .then(data => data)
        .catch(err => console.log(err))
        console.log(existed);
        if (!existed){
            await validate(admin)
            .then(async (errors) => {
                if (errors.length > 0) {
                    let errorTexts = Array();
                    for (const errorItem of errors) {
                        errorTexts = errorTexts.concat(errorItem.constraints);
                    }
                    console.log(errorTexts);
                    return res.json({ error: errorTexts });
                } else {
                    console.log(admin);
                    // const salt = bcrypt.genSaltSync(18)
                    const admin_password  = await bcrypt.hash(admin.password, 10)
                    .then(data => data)
                    .catch(err => console.log(err));
                    const data = {
                            username: admin.username,
                            email: admin.email,
                            // salt: salt,
                            password: admin_password,
                            };
                    let saved
                    try{
                        saved = await AdminModel.create(data)
                        console.log(saved);
                        const payload: Payload = {
                            username: admin.username,
                            password: admin.password,
                        }
                        const token = GenerateTK(payload)
                        return res
                            .cookie(
                                "access_token",
                                token, {
                                httpOnly: true,
                                maxAge: 300000,
                            }
                            )
                            .redirect(200,"Admin/Profile")
                    }catch(err){
                        return res.status(401).json({error:`Bad Request`});
                    };
                    }
            });;
        }else {
            return res.status(403).json({error:"user already exist"})
        }
        return res;
    }

    // VAlidate AdminModel Method


    public static async AdminLogin (req: Request, res: Response): Promise <Response>{
        const admin = plainToClass(Payload, req.body);
        await validate(admin ,{ skipMissingProperties: true })
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
                    const found = await AdminModel.findOne().or([{username:admin.username}, {email: admin.username}]).then(data =>data)
                    .catch(err => {
                        console.log(err);
                        res.render('Templates/Login.ejs',{"error":"Internal Server Error"})
                    });
                    console.log({"found:":found});
                    if (found){
                        try {
                            
                            const paswd = found.password;
                            const checked = await bcrypt.compare(admin.password, paswd)
                            if (checked ) {
                                const payload: Payload = {
                                    username :admin.username,
                                    password: admin.password
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
                                            overwrite: true
                                            
                                    }
                                    )
                                    .redirect(`${process.env.BASE_URL}/Admin/Profile`);
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

    // // Update Password Only


    public static async UpdateAdminPassword(req: Request, res: Response): Promise <Response>{
        // @ts-ignore
        const id = req.user_id; console.log("ID :",req.user_id);

        const admin = plainToClass(Payload, req.body);
        await validate(admin ,{ skipMissingProperties: true })
        .then(async (errors) => {
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                console.log(errorTexts);

                return res.json(errorTexts).status(202);

            } else {
                    const admin_password= await bcrypt.hash(admin.password, 10)
                    .then(data => data)
                    .catch(err => console.log(err));
                    const data = {
                        admin_password: admin_password,
                    }
                    try{

                        const found = await AdminModel.findOne({
                            raw: true,
                            where : {
                                id_admin : id,
                            }
                        })
                        .then(data => data)
                        .catch(err => {
                            console.log(err);
                            res.status(500).json("Something Went Wrong");

                        })
                        if(found){

                            console.log("typeOf", typeof id);

                            await AdminModel.updateOne(data).where('_id', found._id)
                            .then ((data)=>{
                                res.status(200).json({message:'Password Updated Successfully'});
                            })
                            .catch((err) => {
                                console.log(err)
                                res.status(500).json({error:'Internal Server Error'});
                            });
                        }else{
                            return res.status(404).json({error: "AdminModel Not Found"})
                        }


                    }catch(err){
                        console.log(err);
                        return res.status(401).json({error:'Bad Request'});
                    }
                }})
                    return res;

    }

    // // Update AdminModel Peofile Method

    public static async UpdateAdmin(req: Request, res: Response): Promise <Response> {
        // @ts-ignore
        const id = req.user._id
        const admin = plainToClass(CreateAdminDTO, req.body);
        await validate(admin ,{ skipMissingProperties: true })
        .then(async (errors) => {
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                console.log(errorTexts);

                return res.json(errorTexts).status(205);

            } else {


                    try{
                        const updated = await AdminModel.updateOne(admin).where('_id', id)
                        
                            .then((data) => {
                                console.log(data);
                            return data
                        })
                        .catch((err) =>{
                            console.log(err);
                            return res.status(500).json({error: 'Please Try in a While, if the Error Remain pleaseContact Administration'})
                        } );
                        //@ts-ignore
                        if (updated[0] !== 0 ){
                            return res.status(201).json({ 'user': updated})
                        }else{
                            return res.status(500).json({error: 'Please Try in a while'})
                        }

                    }catch(err){
                        return res.status(401).json(`Bad Request`);
                    }

            }
        });;

        return res;

    }
    public static async getAdminProfile(req: Request, res: Response) {
        //@ts-ignore
        const user = req.user
        return res.render('Templates/Admin/Profile.ejs', { "user": user });
    }

    // // Reset Password Method

    // public static async ResetPassword(req: Request, res: Response){
    //     console.log(req.body);
    //     const admin = plainToClass(CreateAdminDTO, req.body);
    //     await validate(admin ,{ skipMissingProperties: true })
    //     .then(async (errors) => {
    //         if (errors.length > 0) {
    //             let errorTexts = Array();
    //             for (const errorItem of errors) {
    //                 errorTexts = errorTexts.concat(errorItem.constraints);
    //             }
    //             console.log(errorTexts);
    //             return res.status(205).json(errorTexts);
    //             console.log(admin.admin_email);
    //         } else {
    //             const found :any = await AdminModel.findOne({raw: true,
    //                 where:{
    //                     admin_email : admin.admin_email
    //                 }})
    //                 .then (data => data)
    //                 .catch(err =>{
    //                     console.log(err);
    //                     return res.status(500).json({error:"Internal Server Error"});

    //                 });

    //             if (found){

    //                 try{
    //                     const id = found.id_admin
    //                     const toke = await TokenModel.findOne({raw: true,
    //                         where:{
    //                             id_user : id
    //                         }})
    //                         .then (data=>{return  data})
    //                         .catch(err =>{
    //                             console.log(err);
    //                             return res.status(500).json({error:"Internal Server Error"});

    //                         });
    //                     if (toke === null){
    //                         const id_user : string = found.id_admin;
    //                         console.log(id_user);
    //                         const token = randomBytes(34).toString('hex');
    //                             console.log(token);
    //                         let expires_date = new Date();
    //                         expires_date.setDate(expires_date.getDate() + 24/24);
    //                         try{

    //                             console.log(`id_user ; ${id_user} & access_token : ${token}`);
    //                             const data  = {
    //                                     id_user: id_user,
    //                                     token : token,
    //                                     expires_in : expires_date,
    //                                 }
    //                             await TokenModel.create(data)
    //                             .then(data => data)
    //                             .catch(err => console.log(err));
    //                         }catch(err){
    //                             console.log(err);
    //                         }
    //                         if (token){
    //                             const link = `http://localhost:3000/admin/reset-password/${id_user}/${token}`;
    //                             console.log(link);
    //                             try{
    //                                 await SendMail(found.admin_email,found.admin_first_name, found.admin_last_name ,"Password Reset", link);
    //                                 return res.status(200).json({message: 'Reset Mail Has Been Sent, Check Your Mail'})
    //                             }catch(err){
    //                                 console.log(err);
    //                                 return res.status(500).json({error:'Message Couldnt Be Sent Try In A While'});
    //                             }
    //                         }else{
    //                             return res.status(403).json({error:"An Error Occured, Please Try Again in a While"})
    //                         }
    //                     }else{
    //                         return res.status(300).json({error:'A Message has been sent earlier check your spam folder'})
    //                     }
    //                 }catch(err){
    //                     console.log(err);
    //                     return res.status(500).json({error:"Internal Server Error"});
    //                 }
    //             }else {
    //                 return res.status(400).json({error:'user Do not exist'})
    //             }
    //     }})

    // }

    // // verify the reset password link and update Password

    // public static async VerifyResetPassword(req: Request, res: Response):Promise<Response>{
    //     const id_user  = req.params.id_user;
    //     const token : string = req.params.token;
    //     console.log(token , ' ', id_user);
    //     const user = await Admin.findOne({
    //         raw: true,
    //         where :{
    //             id_admin : id_user,
    //         }
    //     }).then(data => data)
    //     .catch(err=> console.log(err)
    //     );
    //     if (user){
    //         await TokenModel.destroy({
    //             where: {
    //                 //@ts-ignore
    //               expires_in: { [Op.lt]: Sequelize.fn('CURDATE')},
    //             }
    //           });
    //                 const access_token = await TokenModel.findOne({
    //                     raw: true,
    //                     where: {
    //                         id_user: id_user,
    //                         token: token,
    //                         // @ts-ignore
    //                         expires_in: { [Op.gt]: Sequelize.fn('CURDATE')},
    //                     }
    //                 })
    //                 .then(data => data)
    //                 .catch(err =>{
    //                     console.log(err);
    //                     return res.status(500).json({error:"Internal Server Error"});

    //                 });
    //                 console.log(access_token);
    //                 if (access_token){
    //                     const id = user.id_admin;
    //                     const token = GenerateTK(id)
    //                     try{
    //                         await TokenModel.destroy({
    //                             where: {
    //                                 id_user: id_user,
    //                             }
    //                         }).then(data => data)
    //                         .catch(err =>{
    //                             console.log(err);
    //                             return res.status(500).json({error:"Internal Server Error"});
    //                         });
    //                         return res.status(200).json({token:token});
    //                     }catch(err){
    //                         console.log(err);
    //                         return res.status(500).json({error:'Something Went Wrong ! '});
    //                     }
    //                 }else {
    //                     return res.status(403).json({error:'TokenModel Is Expired Please Reset your Password !!!'});
    //                 }
    //     }else{
    //         return res.status(403).json({error:'AdminModel do not exist'})
    //     }
    // }

}
