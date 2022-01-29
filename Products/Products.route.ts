import express from "express";
import path from "path";
import IsSuperAdmin from "../Middlewares/auth/is_super_user.middleware";
import { ProductController } from "./Product.controller";
import upload from "../Middlewares/upload.middleware";


const product_router = express.Router();


product_router.get('/Admin/Products', ProductController.GetAllProducts);
product_router.get('/Products', ProductController.GetProducts);


product_router.post('/Admin/Products', upload ,IsSuperAdmin,ProductController.CreateProduct);

export default product_router;

