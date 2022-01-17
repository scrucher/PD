import * as nodemailer from "nodemailer"
import { MailConfig } from "../Config/config";
import { Creadentials } from "./credentials.dto";



async function SendMail (credentials: Creadentials){

    try {
        const transporter = nodemailer.createTransport({
            host: MailConfig.host,
            port: MailConfig.port,
            secure: true,
            auth: {
                user: MailConfig.user,
                pass: MailConfig.pass,
            }
        });

        await transporter.sendMail({
            from: MailConfig.user, // user email
            to: credentials.email, // receiver email
            subject: credentials.subject, 
            text:` Hello ${credentials.last_name} ${credentials.first_name}
            We would like to inform you that we knew that you have struggles accessing, your account. This message holds a link that would help you reset your password if you confirm please click the link bellow:
            ${credentials.message}

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