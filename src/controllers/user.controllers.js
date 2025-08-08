
import User from "../models/user.models.js";

export const createUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if (name === undefined || name === ""){
            return res.status(400).json({
                msg:"Name no puede ser nulo"
            })
        };
        if (email === undefined || email === ""){
            return res.status(400).json({
                msg:"Email no puede ser nulo"
            })
        };
        if (password === undefined ||password=== ""){
            return res.status(400).json({
                msg:"Password no puede ser nulo"
            })
        };
        await User.create({name,email,password});
        try {
            return res.status(201).json({
                msg:"se ha creado el usuario correctamente"
        });
        } catch (error) {
            return res.status(500).json({
                msg:"No se pudo crear el usuario"
            })
        };
    } catch (error) {
        console.log(error);
     return res.status(500).json({
        msg:"no se creo el usuario complete todos los campos"
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
    try {
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({
                msg:"No se encontro la tarea"
            })
        }
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
        return res.status(200 .json({
            msg:"Tarea eliminada correctamente"}))
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo eliminar la tarea"
        })
    }



}

