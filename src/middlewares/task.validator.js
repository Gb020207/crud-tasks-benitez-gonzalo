import { body, param } from "express-validator";
import Task from "../models/task.models.js";

export const validateCreateTask = [
    body("title").notEmpty().withMessage("El titulo de la tarea no puede estar vacío"),
    body("description").notEmpty().withMessage("Se requiere una descripción para la tarea").bail(),
    body("isComplete").optional().isBoolean().withMessage("isComplete debe ser un valor booleano"),
    body("userId").notEmpty().withMessage("Se requiere un ID de usuario para asignar la tarea").bail()
    .custom(async (userId) => {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return true;
    }),
]
