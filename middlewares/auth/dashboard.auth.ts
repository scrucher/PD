// import Admin from "../../models/admin";
// import AdminUser from "../../models/admin_user";
// import decode_token from "../../utility/decode_token";

// //@ts-ignore
// const IsSuperAdmin = async (req, res, next) => {
//     try{    
//         // const token = req.header("Authorization").replace("Bearer ", "")
//         const token = req.cookies.access_token
//         if (!token){
//             res.setHeader("message" , "Unauthorized");
//             res.status(401).json("Unauthorized");
//         }else {

//             const decooded = decode_token(token);
//             //@ts-ignore
//             console.log(decooded.id);
//             const super_admin = await Admin.findOne({
//                 where:{
//                     //@ts-ignore 
//                     id_admin:decooded.id,            
//                 }
//             })
//             .then(data => data)
//             .catch (err=> console.log(err));
//             console.log(super_admin);
//             const admin_user = await AdminUser.findOne({
//                 where:{
//                     //@ts-ignore 
//                     id_admin:decooded.id,            
//                 }
//             })
//             .then(data => data)
//             .catch (err=> console.log(err));
//             console.log(super_admin);
//             // @ts-ignore
//             req.user_id= decooded.id

//             if (super_admin)
//             {
//                 next();
//             }else if(admin_user)
//             {
//                 next();
//             }else {
//                 res.setHeader("message" , "Access Denied");
//                 res.status(401).json("Access Denied").redirect('localhost:3000/login/');
//             } 
//         }          
//     }catch(err){
//         res.setHeader("message" , "Unauthorized");
//         res.status(401).json("Unauthorized").redirect('localhost:3000/login/');
//     }    
//     return res;
// }
  
// export default IsSuperAdmin