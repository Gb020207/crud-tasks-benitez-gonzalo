import { body, param } from "express-validator";
import User from "../models/User.js";

export const validateCreateUser = [
    body("name").notEmpty().withMessage("Name no puede estar vacío"),
    body("email").isEmail().withMessage("Email no valido").bail(),
    body("email").custom(async (email) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("Email ya registrado");
        }
        return true;
    }),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
]
export const validateUpdateUser = [
    param("id").notEmpty().withMessage("Se requiere un ID de usuario").bail()
    .custom(async (id) => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return true;
    }),
    body("name").optional().notEmpty().withMessage("Name no puede estar vacío"),
    body("email").optional().isEmail().withMessage("Email no valido").bail()
    .custom(async (email, { req }) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && existingUser.id !== parseInt(req.params.id, 10)) {
            throw new Error("Email ya registrado");
        }
        return true;
    }),
    body("password").optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
]

export const validateGetUserById = [
    param("id").notEmpty().withMessage("se requiere un id de usuario").bail()
    .custom(async (id) => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return true;
    }
    )
]

export const validateDeleteUser = [
    param("id").notEmpty().withMessage("se requiere un id de usuario").bail()
    .custom(async (id) => {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return true;
    }
    )
]