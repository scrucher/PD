import express from "express";
import IsSuperAdmin from "../Middlewares/auth/is_super_user.middleware";
import { CategoryController } from "./category.controller";


const category_router = express.Router();

category_router.post('/Admin/Category', IsSuperAdmin, CategoryController.CreateCategory);
category_router.patch('/Admin/Category', IsSuperAdmin, CategoryController.UpdateCategory);
category_router.delete('/Admin/Category/:id', IsSuperAdmin, CategoryController.DeleteCategory);
category_router.get('/Category', CategoryController.GetCategories);
category_router.get('Category/:id', CategoryController.GetCategoryById);
category_router.get('/Admin/Category', IsSuperAdmin, CategoryController.GetAllCategories)



export default category_router;

