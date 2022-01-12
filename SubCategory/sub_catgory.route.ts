import express from "express";
import IsSuperAdmin from "../middlewares/auth/is_super_user.middleware";
import { SubCategoryController } from "./sub_category.controller";


const subCategory_router = express.Router();

subCategory_router.post('/Admin/SubCategory', IsSuperAdmin, SubCategoryController.CreateSubCategory)
subCategory_router.patch('/Admin/SubCategory/:id', IsSuperAdmin, SubCategoryController.UpdateSubCategory)
subCategory_router.delete('/Admin/SubCategory/:id', IsSuperAdmin, SubCategoryController.DeleteSubCategory)
subCategory_router.get('/Admin/SubCategor', SubCategoryController.GetAllSubCategories)
subCategory_router.get('/Admin/SubCategory/:id', SubCategoryController.GetCategoryById)
subCategory_router.get('/Adimn/Category/SubCategory/:id', SubCategoryController.GetAllSubCategoriesToCateegory);


export default subCategory_router;

