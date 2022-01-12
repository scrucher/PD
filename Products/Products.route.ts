import express from "express";
import path from "path";
import IsSuperAdmin from "../middlewares/auth/is_super_user.middleware";
import { ProductController } from "./Product.controller";


const product_router = express.Router();


product_router.get('/Admin/Products', IsSuperAdmin, ProductController.GetAllProducts);

product_router.post('/Admin/Product', IsSuperAdmin,ProductController.CreateProduct);

export default product_router;

