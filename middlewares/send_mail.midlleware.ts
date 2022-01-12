import * as nodemailer from "nodemailer"
// import { MailConfig } from "../config/config";

export const MailConfig = {
    host: "mail.hshop.pro",
    user: "test@hshop.pro",
    pass: "!kK.UR[PfClR",
    port: 465,
};



async function SendMail (email: string,first_name:string, last_name:string ,subject: string, text: string){

    try {
        const transporter = nodemailer.createTransport({
            host: MailConfig.host,
            port: 465,
            secure: true,
            auth: {
                user: MailConfig.user,
                pass: MailConfig.pass,
            }
        });

        await transporter.sendMail({
            from: MailConfig.user, // user email
            to: email, // receiver email
            subject: subject, 
            text:` Hello ${last_name} ${first_name}
            We would like to inform you that we knew that you have struggles accessing, your account. This message holds a link that would help you reset your password if you confirm please click the link bellow:
            ${text}

            Faical
        `,})
        .then(data => data)
        .catch (err => console.log(err));

        console.log("email sent sucessfully");
        return ("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
        return ("email not sent")
    }


}

export default SendMail;