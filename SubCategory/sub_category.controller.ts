import { Request, Response } from "express";
import { SubCategoryDTO } from "./sub_category.dto";
import { SubCategoryModel } from "./sub_category.model";



export class SubCategoryController{


    public static async CreateSubCategory(req: Request, res: Response) {
        const data: SubCategoryDTO = req.body
        console.log(data);
        try {
            const created = await SubCategoryModel.create(data)
                .then(data=> data)
                .catch(err => console.log(err))
            console.log({ "data": created, "msg": "SubCategory Created Successfully" })
            return ({ "data": created, "msg": "SubCategory Created Successfully" });
 
         } catch (err) {
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async GetAllSubCategories(req: Request, res: Response) {
        try {
            const data = await SubCategoryModel.find()
                .populate('product_id')
                .then(data => data)
                .catch(err => console.log(err));
            return res.status(200).render("Templates/Admin/SubCategory.ejs", {data: data});
            
        } catch (err) {
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async GetCategoryById(req: Request, res: Response) {
        const id = req.params
        try {
            const data = await SubCategoryModel.find()
                .where('_id', id)
                .populate('product_id')
                .then(data => data)
                .catch(err => err)
            return res.status(200).json({data: data})
        } catch (err) {
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async UpdateSubCategory(req: Request, res: Response) {
        const id = req.params;
        const data: SubCategoryDTO = req.body
        try {
            const updated = await SubCategoryModel.updateOne(data)
                .where('_id', id)
                .then(data => data)
                .catch(err => err )
            return res.status(201).json({ data: updated, "msg": "SubCategory Updated Successfully" });
        } catch (err) {
           return res.status(500).json({ "error": "Internal Server Error" });

        }
    }

    public static async DeleteSubCategory(req: Request, res: Response) {
        const id = req.params;
        try {
            await SubCategoryModel.deleteOne().where('_id', id)
            return res.status(200).json({data: "SubCategory Deleted Suyccessfully"})
        } catch (err) {
            return res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    public static async GetAllSubCategoriesToCateegory(req: Request, res: Response) {
        const _id = req.params.id
        try {
            const sub = await SubCategoryModel.find().where('category_id', _id)
            return res.status(200).json({sub : sub})
        } catch (err) {
            console.log(err);
            return res.status(500).json({"error": "Internal Server Error"}) ;
        }
    }
}