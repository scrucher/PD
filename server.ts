import express, { Application } from "express";
import bodyParser from "body-parser";
import admin_router from "./Admin/admin.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import category_router from "./Category/catgory.route";
import subCategory_router from "./SubCategory/sub_catgory.route";
import product_router from "./Products/Products.route";
import fileUpload from "express-fileupload";
import User_router from "./Users/user.route";
import char_router from "./Charcteristics/characteristics.route";

const app: Application = express();
export async function App() {
    
    app.set('view engine', 'ejs')
    app.use(express.static('/Public'));
    console.log(__dirname)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));  
    app.use(cors({ origin: "*" }))
    app.use(cookieParser());
    // app.use(fileUpload())
    // app.use(cookieParser.signedCookie("scret"))
    app.get('/', (req, res) => {
        res.render('Templates/index.ejs');
    });
    app.use(admin_router);
    app.use(category_router);
    app.use(subCategory_router);
    app.use(product_router);
    app.use(User_router);
    app.use(char_router);
    //last one 
    app.use(function (req, res, next) {
        res.status(404).render('Templates/404.ejs');
    });
}
export default app;

