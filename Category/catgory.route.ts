import express from "express";
import IsSuperAdmin from "../Middlewares/auth/is_super_user.middleware";
import { CategoryController } from "./category.controller";
import {FormUpload} from "../Middlewares/FormMiddleware.middleware"
import formidable from "formidable";
const category_router = express.Router();

category_router.post('/Admin/Category',IsSuperAdmin, function(req, res, next){
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log({
            "req": req,
            "fields": fields,
            "files": files,
        });
        next();
    });
}, CategoryController.CreateCategory);
category_router.patch('/Admin/Category', IsSuperAdmin, CategoryController.UpdateCategory);
category_router.delete('/Admin/Category/:id', IsSuperAdmin, CategoryController.DeleteCategory);
category_router.get('/Category', CategoryController.GetCategories);
category_router.get('Category/:id', CategoryController.GetCategoryById);
category_router.get('/Admin/Category', IsSuperAdmin, CategoryController.GetAllCategories)



export default category_router;

