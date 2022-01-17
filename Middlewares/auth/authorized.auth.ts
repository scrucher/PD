// import { Sequelize } from "sequelize-typescript";
// import Admin from "../../models/admin";
// import AdminRole from "../../models/admin_role";
// import Role from "../../models/role";
// import decode_token from "../../utility/decode_token";


// // @ts-ignore
// export const IsAuthorized = async (req, res, next) => {

//     try{
//         const token = req.cookies.access_token
//         if (!token){
//             res.setHeader("message" , "Unauthorized");
//             res.status(401).json("Unauthorized");
//         }else {
//             const decooded = decode_token(token);
//             //@ts-ignore
//             console.log(decooded.id);
//             //@ts-ignore
//             const id = decooded.id
//             const roles:any = await AdminRole.findAll({
//                 raw:true,
//                 where: {
//                     id_admin_user: id,
//                 },
//                 include: [{
//                     model: Role,
//                     as : "role",
//                     required: true,
//                     where : {
//                         id_role : Sequelize.col("AdminRole.id_role"),
//                     }
//                 }]
//             })
//             .then(data => data)
//             .catch (err=> console.log(err));
//             req.user_id = id;
//             req.user_role = roles;
//             console.log(roles.length);
//             if (roles.length > 0){
//                 for (const role of roles){
//                     switch (role['role.role_route']) {

//                             case "color" :
//                             break;

//                             case "advertising" :
//                             break;

//                             case "category" :
//                             break;

//                             case "city" :
//                             break;

//                             case "country" :
//                             break;

//                             case "family" :
//                             break;

//                             case "product" :
//                             break;

//                             case "promo" :
//                             break;

//                             case "region" :
//                             break;

//                             case "sub_category" :
//                             break;

//                             case "tva" :
//                             break;

//                             case "unity" :
//                             break;

//                             case "users" :
//                             break;
//                     }
//                 }
//                 next()
//             }else if(roles.length === 0){
//                 const admin = await Admin.findOne({
//                     where : {
//                         id_admin : id,
//                     }
//                 })
//                 .then(data => data)
//                 .catch(err => {
//                     console.log(err);
//                     res.status(500).send("Internal Server Error");
//                 })
//                 if (admin){
//                     next()
//                 }
//                 else{
//                     res.setHeader("message" , "access denied");
//                     return res.status(401).send("access denied");
//                 }
//             }else{
//                 res.setHeader("message" , "access denied");
//                 return res.status(401).send("access denied");
//             }
//         }
//     }catch(err){
//         res.setHeader("message" , "Unauthorized");
//         res.status(401).json("Unauthorized");
//     }
//     return res;
// }
