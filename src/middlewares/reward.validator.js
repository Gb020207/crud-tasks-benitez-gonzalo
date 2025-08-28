import { body, param } from "express-validator";
import Reward from "../models/reward.models.js";

export const validateCreateReward = [
body("name").notEmpty().withMessage("La recompensa requiere un nombre"),
body("levelRequired").notEmpty().withMessage("Se requiere asignar un nivel requerido para la recompensa").isLength({ min: 1}),
body("rankId").notEmpty().withMessage("Se requiere asignar un rango para la recompensa").bail()
.custom(async (rankId) => {
    const rank = await Rank.findByPk(rankId);
    if (!rank) {
        throw new Error("Rango no encontrado");
    }
    const existingReward = await Reward.findOne({ where: { rankId } });
    if (existingReward) {
        throw new Error("Ya existe una recompensa asociada a este rango");
    }
    return true;
}),
]