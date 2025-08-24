import Task from "../models/task.models.js";
import User from "../models/user.models.js";


export const createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    // Validaciones
    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "El título no puede ser nulo" });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ msg: "La descripción no puede ser nula" });
    }
    if (!userId) {
      return res.status(400).json({ msg: "La tarea debe estar asociada a un usuario" });
    }

    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    // Crear tarea
    const task = await Task.create({ title, description, userId });

    return res.status(201).json({
      msg: "Se ha creado la tarea correctamente",
      data: task
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear la tarea" });
  }
};


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: {
        model: User,
        as: "author",
        attributes: { exclude: ["password"] }
      }
    });

    return res.json({
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener las tareas" });
  }
};


export const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json({ msg: "El id debe ser un número positivo" });
  }

  try {
    const task = await Task.findByPk(id, {
      include: {
        model: User,
        as: "author",
        attributes: { exclude: ["password"] }
      }
    });

    if (!task) {
      return res.status(404).json({ msg: "No se encontró la tarea" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener la tarea" });
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

