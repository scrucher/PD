import decode_token from "../../Utilities/decode_token";
import { Payload } from "../../Utilities/payload";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { UserModel } from "../../Users/user.model";

dotenv.config();
//@ts-ignore
const IsAuthenticated = async (req, res, next) => {
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
            return res.render('Templates/Users/Login.ejs',{"error":"Unauthorized"})
        }else {
            //@ts-ignore
            const decooded: Payload = decode_token(token);
            //@ts-ignore
            const data = decooded.payload
            //@ts-ignore
            const user = await UserModel.findOne().or([{ username: data.username }, { email: data.username }]).then(data => data)
            .then(data => data)
            .catch (err=> console.log(err));
            console.log(user);
            // @ts-ignore
            req.user = user;

            
            if (user)
            {
                console.log(user)
                next();
            }else 
            {
                return res.render('Templates/Users/Login.ejs',{"error":"Aceess Denied "})
            } 
        }          
    }catch(err){
        return res.render('Templates/Users/Login.ejs',{"error":" Unauthorized"})
    }    
    return res;
}
  
export default IsAuthenticated