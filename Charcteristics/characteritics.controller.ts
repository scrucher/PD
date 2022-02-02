import {Request, Response} from "express";
import {CharacteristicsModel} from "./characteristics.model";
import {CharacteristicsDto} from "./characteristics.dto";


export class CharacteristicsController{

    public static  async  CreateCharacteristics (req: Request, res: Response):Promise<Response>{
        const char : CharacteristicsDto = req.body;
        try {
            const saved = await CharacteristicsModel.create(char)
            if (saved) return res.status(200).json({msg: "Characteristics Created Successfully"});
        }catch(err){
            console.log(err)
            return res.status(500).json({err: "Internal Server Error"});
        }
        return res;
    }

    public static async GetAllCharacteristics(req: Request, res: Response){
        try {
            const found = await CharacteristicsModel.find()
            return res.status(200).json({});
        }catch(err){
            return res.status(200).json({err: "Internal Server Error"});
        }
    }

    public static async GetCharacteristicById(req: Request, res: Response){
        const id = req.params
        try {
            const found = await CharacteristicsModel.find().where("_id", id)
            return res.status(200).json({msg: found})
        }catch(err){
            return res.status(200).json({err: "Internal Server Error"});
        }
    }

    public static async UpdateCharacteristics(req: Request, res: Response){
        const id = req.params;
        const char: CharacteristicsDto = req.body;
        try{
            const updated = await CharacteristicsModel.updateOne(char).where('_id', id)
            if (updated) return res.status(200).json({msg: "Characteristic Updated Successfully"})
        }catch (e) {
            console.log(e)
            return res.status(500).json({err: "Internal Server Error"})
        }
    }

    public static async DeleteCharacteristics(req: Request, res: Response){
        const id = req.params
        try{
            const deleted = await CharacteristicsModel.deleteOne().where("_id", id);
        }catch (e) {
            console.log(e)
            return res.status(200).json({err: "Internal Server Error"})
        }
    }

}