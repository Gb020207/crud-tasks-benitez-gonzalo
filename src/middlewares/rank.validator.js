import { body, param } from "express-validator";
import Rank from "../models/rank.models.js";

export const validateCreateRank = [
    body("name").notEmpty().withMessage("Name no puede estar vacío"),
    body("description").notEmpty().withMessage("Description no puede estar vacío"),
    body("level").notEmpty().withMessage("Se requiere asignar un nivel al rango").bail().isLength({ min: 1}),

]