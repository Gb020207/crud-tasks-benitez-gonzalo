import Task from "../models/task.models.js";

export const createTask = async (req,res) => {
    try {
        const {title,description} = req.body;
        if (title === undefined || title === ""){
            return res.status(400).json({
                msg:"Title no puede ser nulo"
            })
        };
        if (description === undefined || description === ""){
            return res.status(400).json({
                msg:"Description no puede ser nulo"
            })
        };
        await Task.create({title,description});
        try {
            return res.status(201).json({
                msg:"se ha creado la tarea correctamente"
        });
        } catch (error) {
            return res.status(500).json({
                msg:"No se pudo crear la tarea"
            })
        };
    } catch (error) {
        console.log(error);
     return res.status(500).json({
        msg:"no se creo la tarea complete todos los campos"
     })
    }
    
};      

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        
    } catch (error) {
        
    }
}