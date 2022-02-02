import { Request, Response } from "express";
import { CategoryModel } from "./category.model";
import { CatgoryDTO } from "./category.dto";


export class CategoryController{

    public static async CreateCategory(req: Request, res: Response) {
        const category: CatgoryDTO = req.body
        try {
            await CategoryModel.create(category)
            return res.status(201).json({data: "Category Created Successfully"})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async GetAllCategories(req: Request, res: Response) {
        try {
            const data = await CategoryModel.find()
            return res.render('Templates/Admin/Category.ejs', { "data": data });
        } catch (err) {
            return res.status(500).json({ "error": "Internal Server Error" });
        }
    }


    public static async GetCategories(req: Request, res: Response) {
        try {
            const data = await CategoryModel.find()
            return res.json({ "data": data });
        } catch (err) {
            return res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async GetCategoryById(req: Request, res: Response) {
        const id = req.params
        try {
            const category = await CategoryModel.findOne()
                .where('_id', id)
                .populate('product_id')
                .populate('subCategory_id')
            res.status(200).json({ data: category })
        } catch (err) {
            return res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async UpdateCategory(req: Request, res: Response) {
        const id = req.params;
        const data : CatgoryDTO = req.body
        try {
            const updated = await CategoryModel.updateOne(data)
                .where('_id', id)
                .populate('product_id')
                .populate('subCategory_id')
            res.status(200).json({ data: updated })
        } catch (err) {
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }
    public static async DeleteCategory(req: Request, res: Response) {
        const id = req.params
        try {
            await CategoryModel.deleteOne(id)
                // .where('_id', id)
            res.status(200).json({ data: "Category Deleted Successfully" })
        } catch (err) {
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }
}