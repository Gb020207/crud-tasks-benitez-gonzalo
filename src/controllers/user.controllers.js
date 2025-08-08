
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
export const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        return res.json({
            count: user.length,
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
              msg:"No se encontraron Usuarios"
        }
          
        )
    }
};
export const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg:"No se encontro el usuario"
            })
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo encontrar el usuario"
        })
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

