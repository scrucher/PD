import { Request, Response } from "express";
import { ProductDTO } from "./Product.dto";
import { ProductModel } from "./Product.model";


export class ProductController{
    public static async CreateProduct(req: Request, res: Response) {
        console.log(req.files)
        const { name,
            description,
            category_id,
            price,
            subCategory_id }: ProductDTO = req.body
        console.log({ "file_name": req.files })
        console.log({ "file_name": req.file })

        // const image = req.files?.image.name
        const data = {
            name: name,
            price: price,
            // image: image,
            description: description,
            category_id: category_id,
            subCategory_id: subCategory_id
        }
        try {
            await ProductModel.create(data)
                .then( async (data) => {
                    return data;
                    // let charchteristic : CharDto
                    // for (charchteristic of charachteristics) {
                    //     const dt = {
                    //         char_name: charchteristic.char_name,
                    //         char_price: charchteristic.char_price,
                    //     }
                    //     try {
                    //         await CharacteristicsModel.create(dt)
                    //         res.status(201).json({ msg: "Product Created Successfully" });
                    //     } catch (err) {
                    //         res.status(500).json({ error: "Connot Save Characteristic" });
                    //     }
                    // }
                })
        } catch (err) {
            console.log(err)
            res.status(500).json({"error": "Cannot Save Product"})
        }
    }
    public static async GetAllProducts(req: Request, res: Response) {
        try {
            console.log("here we go")
            const data = await ProductModel.find()
                .populate("category_id")
                .populate("subCategory_id")
                .exec()
            return res.render('Templates/Admin/Products.ejs', { "data": data });
        } catch (err) {
            return res.status(500).json({"err": "Internal Server Error"})
        }
    }
    public static async GetProducts(req: Request, res: Response) {
        try {
            console.log("here we go")
            const data = await ProductModel.find()
                .populate("category_id")
                .populate("subCategory_id")
                .exec()
            return res.status(200).json({ "data": data });
        } catch (err) {
            return res.status(500).json({"err": "Internal Server Error"})
        }
    }

    
}