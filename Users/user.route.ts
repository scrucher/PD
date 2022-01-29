import express from "express";
import IsAuthenticated from "../Middlewares/auth/dashboard.auth";
import { UserController } from "./user.controller";
// import IsSuperUser from "../middlewares/auth/is_super_user.middleware";
// import IsSuperUser from '../middlewares/auth/is_super_user.middleware'


const User_router = express.Router();


User_router.post('/User/SignUp', UserController.CreateUser); // Create User
User_router.post('/User/Login', UserController.UserLogin);  // Authenticate User
// User_router.get('/User/Profile', UserController.getUserById)
User_router.get('/User/Login', (req, res) => {
    res.render('Templates/Users/Login.ejs');
})
User_router.get("/User/SignUp", (req, res)=>{
    res.render('Templates/Users/Register.ejs');
})
// User_router.get('/User', (req, res) => {
//     res.render('Templates/s/Profile.ejs');
// })
// User_router.post('/User/password/reset',IsSuperUser, UserController.ResetPassword); // Reset User Password
// User_router.patch('/User/reset-password/:id_user/:token/', IsSuperUser , UserController.VerifyResetPassword); // Verify Reset Password
// User_router.patch('/User/password/', IsSuperUser ,UserController.UpdateUserPassword); // Update User Password
User_router.patch('/User/Profile',UserController.UpdateUser);  // Updae User Profile
User_router.get('/logout', (req, res) => {
    res.cookie("access_token", "").redirect("/")
})
User_router.get("/User/Profile", IsAuthenticated,UserController.getProfile);
User_router.get("/User", (req, res) => {
    res.render('Templates/Users/home.ejs');
})
export default User_router;

