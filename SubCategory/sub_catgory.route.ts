import express from "express";
import IsSuperAdmin from "../Middlewares/auth/is_super_user.middleware";
import { SubCategoryController } from "./sub_category.controller";
import upload from "../Middlewares/upload.middleware"


const subCategory_router = express.Router();

subCategory_router.post('/Admin/SubCategory', IsSuperAdmin, upload.single("image"), SubCategoryController.CreateSubCategory)
subCategory_router.patch('/Admin/SubCategory/:id', IsSuperAdmin, SubCategoryController.UpdateSubCategory)
subCategory_router.delete('/Admin/SubCategory/:id', IsSuperAdmin, SubCategoryController.DeleteSubCategory)
subCategory_router.get('/Admin/SubCategory',IsSuperAdmin ,SubCategoryController.GetAllSubCategories)
subCategory_router.get('/Admin/SubCategory/:id', SubCategoryController.GetCategoryById)
subCategory_router.get('/Adimn/Category/SubCategory/:id', SubCategoryController.GetAllSubCategoriesToCateegory);


export default subCategory_router;

