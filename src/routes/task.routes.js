import { Router } from "express";
import { createTask, deleteTaskById, getAllTasks, getTaskById, updateTaskById,  } from "../controllers/task.controllers.js";

const routerTask = Router();
routerTask.post('/tasks', createTask);
routerTask.get('/tasks', getAllTasks);
routerTask.get('/tasks/:id', getTaskById);
routerTask.put('/tasks/:id', updateTaskById);
routerTask.delete('/tasks/:id', deleteTaskById);

export default routerTask;