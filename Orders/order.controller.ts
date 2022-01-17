import { Request, Response } from "express";
import { OrderDTO } from "./order.dto";
import { OrderModel } from "./order.model";

export class OrderController{

    async CreateOrder(req: Request,res: Response): Promise<Response> {
        const {products, characteristics, total_price} : OrderDTO = req.body
        const route = Array();

        // const user_id = req.user._id;
        const order = new OrderModel();
        //@ts-ignore
        order.products = products;
        // order.client = user_id
        try { await OrderModel.create(order)
            return res.status(200).json({msg : "Your Order In Progress we'll provide you with duration instantly"})

        } catch (err) {
            console.log(err);
            return res.status(500).json({err: "Cannot Save Order"});
        }
    }


    async GetAllOrders( req: Request, res: Response):Promise <Response> {
        let found;
        try {
            found = await OrderModel.find()
            .populate("products")
            .populate("")
            .exec()
            return res.status(200).json({"data": found});
        } catch (err) {
            console.log(err);
            return res.status(500).json({"err":'Internal Server Error'});
        }
    }

    async GetOrderById(req: Request, res: Response): Promise<Response> {
        const _id = req.params.id
        const found = await OrderModel.findById(_id)
            .then((data: any) => {
                return data
            })
            .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({"err":"Internal Server error"});
            })
        return res.status(200).json({"data":found})
    }

    async DeleteOrder(req: Request, res: Response): Promise<void | any> {
        const _id = req.params.id;
        let deleted;
        try {
            deleted = await OrderModel.deleteOne().where("_id", _id)
        } catch (err) {
            console.log(err);
            res.status(500).json({"err":"Internal Server Error"});
        }
        if (deleted?.deletedCount === 0) {
            return ({"msg":"Product Deleted Successfully"})
        }
    }

    async UpdateOrder(req: Request, res: Response): Promise<Response> {
        const _id = req.params.id
        const update =req.body;
        let updated: any;
        try {
            updated = await OrderModel.updateOne(update,{
                upsert: true,
            }).where("_id", _id);
            res.status(200).json({"msg": "Order Deleted Successfully"})
        } catch (err) {
            console.log(err);
            return res.status(500).json({"err":"Internal Server Error"});
        }
        return updated;
    }
}