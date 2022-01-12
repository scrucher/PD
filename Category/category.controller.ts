import { Request, Response } from "express";
import { InternalServerError } from "routing-controllers";
import { Category, CategoryModel } from "./category.model";
import { CatgoryDTO } from "./category.dto";


export class CategoryController{

    public static async CreateCategory(req: Request, res: Response) {
        const category: CatgoryDTO = req.body
        console.log(req.body)
        try {
            await CategoryModel.create(category)
            return res.status(201).json({data: "Categor Created Successfully"})
        } catch (err) {
            console.log(err)
            throw new InternalServerError('Internal Server Error');
        }
    }

    public static async GetAllCategories(req: Request, res: Response) {
        try {
            const data = await CategoryModel.find()
            return res.render('Templates/Admin/Category.ejs', { "data": data });
        } catch (err) {
            throw new InternalServerError('Internal Server Error');
        }
    }


    public static async GetCategories(req: Request, res: Response) {
        try {
            const data = await CategoryModel.find()
            return res.json({ "data": data });
        } catch (err) {
            throw new InternalServerError('Internal Server Error');
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
            throw new InternalServerError('Internal Server Error');
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
            throw new InternalServerError('Internal Server Error');
        }
    }
    public static async DeleteCategory(req: Request, res: Response) {
        const id = req.params
        try {
            await CategoryModel.deleteOne(id)
                // .where('_id', id)
            res.status(200).json({ data: "Category Deleted Successfully" })
        } catch (err) {
            throw new InternalServerError('Internal Server Error');
        }
    }
}