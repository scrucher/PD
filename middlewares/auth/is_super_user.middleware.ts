import { AdminModel } from "../../Admin/Admin.model";
import decode_token from "../../Utilities/decode_token";
import { Payload } from "../../Utilities/payload";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
//@ts-ignore
const IsSuperAdmin = async (req, res, next) => {
    console.log({
        "headers": req.headers,
        "headers_cookie": req.headers.cookie,
        "cookie": req.signedCookie,
    });
    try{    
        // const token = req.header("Authorization").replace("Bearer ", "")
        const token = req.headers.cookie.replace("access_token=", "")
        console.log(token)

        if (!token){
            res.setHeader("message", "Unauthorized").redirect(`${process.env.BASE_URL}/Admin/Login`)
        }else {
            //@ts-ignore
            const decooded: Payload = decode_token(token);
            //@ts-ignore
            const data = decooded.payload
            //@ts-ignore
            const super_admin = await AdminModel.findOne().or([{ username: data.username }, { email: data.username }]).then(data => data)
            .then(data => data)
            .catch (err=> console.log(err));
            console.log(super_admin);
            // @ts-ignore
            req.user = super_admin;

            if (super_admin !== null)
            {
                console.log(super_admin)
                next();
            }else 
            {
                res.setHeader("message" , "access denied");
                return res.status(401).send("access denied");
            } 
        }          
    }catch(err){
        res.setHeader("message" , "Unauthorized").redirect(`${process.env.BASE_URL}/Admin/Login`)
    }    
    return res;
}
  
export default IsSuperAdmin