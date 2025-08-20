
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
        return res.json({
            count: tasks.length,
            data: tasks
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
              msg:"No se encontraron tareas"
        }
          
        )
    }
};
export const getTaskById = async (req, res) => {
    const {id} = req.params;
    if (isNaN(id) || Number(id) <= 0){
        return res.status(400).json({
            msg:"El id debe ser un numero positivo"
        })
    }
    try {
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({
                msg:"No se encontro la tarea"
            })
        }
        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo encontrar la tarea"
        })
    }
};
export const updateTaskById = async (req, res) => {
    const {id} = req.params;
    const {title,description} = req.body;
    try {
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({
                msg:"No se encontro la tarea"
            })
        }
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
        await Task.update({title,description},{where:{id}});
        return res.status(200).json({
            msg:"Tarea actualizada correctamente"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo actualizar la tarea"
        })
    }





}

export const deleteTaskById = async (req, res) => {
    const {id} = req.params;
    try {
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({
                msg:"No se encontro la tarea"
            })
        }
        await Task.destroy({where:{id}});
        return res.status(200).json({
            msg:"Tarea eliminada correctamente"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo eliminar la tarea"
        })
    }



}

