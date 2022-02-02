import {Router} from "express";
import IsSuperAdmin from "../Middlewares/auth/is_super_user.middleware";
import {CharacteristicsController} from "./characteritics.controller";


const char_router = Router()

char_router.get("/Admin/Characteristics", IsSuperAdmin, CharacteristicsController.GetAllCharacteristics)
char_router.get("/Admin/Characteristic/:id", IsSuperAdmin, CharacteristicsController.GetCharacteristicById)
char_router.post("/Admin/Characteristics", IsSuperAdmin, CharacteristicsController.CreateCharacteristics)
char_router.patch("/Admin/Characteristics", IsSuperAdmin, CharacteristicsController.UpdateCharacteristics)
char_router.delete("/Admin/Characteristics", IsSuperAdmin, CharacteristicsController.DeleteCharacteristics);

export default char_router;