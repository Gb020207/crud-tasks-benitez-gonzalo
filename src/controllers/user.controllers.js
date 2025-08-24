
import User from "../models/user.models.js";
import Task from "../models/task.models.js";


export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ msg: "El nombre no puede ser nulo" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ msg: "El email no puede ser nulo" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ msg: "La contraseña no puede ser nula" });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      msg: "Usuario creado correctamente",
      data: user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear el usuario" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Task,
        as: "tasks"
      },
      attributes: { exclude: ["password"] }
    });

    return res.json({
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};


export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || Number(id) <= 0) {
    return res.status(400).json({ msg: "El id debe ser un número positivo" });
  }

  try {
    const user = await User.findByPk(id, {
      include: {
        model: Task,
        as: "tasks"
      },
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};
export const updateUserById = async (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;
    try {
        const users = await User.findByPk(id);
        if(!users){
            return res.status(404).json({
                msg:"No se encontro el usuario"
            })
        }
        if (name === undefined || name === ""){
            return res.status(400).json({
                msg:"Title no puede ser nulo"
            })
        };
        if (email === undefined || email  === ""){
            return res.status(400).json({
                msg:"Description no puede ser nulo"
            })
        
        };
        if (password === undefined || password === ""){
            return res.status(400).json({
                msg:"Description no puede ser nulo"
            })
        };

        await User.update({name,email,password},{where:{id}});
        return res.status(200).json({
            msg:"Usuario actualizado correctamente"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo actualizar el usuario"
        })
    }





}

export const deleteUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const users = await User.findByPk(id);
        if(!users){
            return res.status(404).json({
                msg:"No se encontro el usuario"
            })
        }
        await User.destroy({where:{id}});
        return res.status(200).json({
            msg:"Usuario eliminado correctamente"})
            
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo eliminar el usuario"
        })
    }



};

