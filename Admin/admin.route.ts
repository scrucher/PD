import express from "express";
import IsSuperAdmin from "../middlewares/auth/is_super_user.middleware";
import { AdminController } from "./admin.controller";
// import IsSuperAdmin from "../middlewares/auth/is_super_user.middleware";
// import IsSuperUser from '../middlewares/auth/is_super_user.middleware'


const admin_router = express.Router();


admin_router.post('/Admin/Register', AdminController.CreateAdmin); // Create Admin
admin_router.post('/Admin/Login', AdminController.AdminLogin);  // Authenticate Admin
admin_router.get('/Admin/Profile', IsSuperAdmin, AdminController.getAdminProfile)
admin_router.get('/Admin/Login', (req, res) => {
    res.render('Templates/Login.ejs');
})
admin_router.get('/Admin', (req, res) => {
    res.render('Templates/Admin/admin.ejs');
})
// admin_router.post('/admin/password/reset',IsSuperAdmin, AdminController.ResetPassword); // Reset Admin Password
// admin_router.patch('/admin/reset-password/:id_user/:token/', IsSuperAdmin , AdminController.VerifyResetPassword); // Verify Reset Password
// admin_router.patch('/admin/password/', IsSuperAdmin ,AdminController.UpdateAdminPassword); // Update Admin Password
admin_router.patch('/Admin/Profile', IsSuperAdmin ,AdminController.UpdateAdmin);  // Updae Admin Profile
admin_router.get('/logout', (req, res) => {
    res.cookie("access_token", "").redirect("/")
})
admin_router.get("/Admin/CreateAdmin", (req, res) => {
    res.render('Templates/Admin/createAdmin.ejs');
})
admin_router.get("/Admin/Forgot-password", (req, res) => {
    res.render('Templates/Admin/reset_password.ejs');
})
export default admin_router;

