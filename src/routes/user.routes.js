import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from "../controllers/user.controllers.js";

const routesUser = Router();

routesUser.post('/users', createUser);
routesUser.get('/users', getAllUsers);
routesUser.get('/users/:id', getUserById);
routesUser.put('/users/:id', updateUserById);
routesUser.delete('/users/:id', deleteUserById);

export default routesUser;