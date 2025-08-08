
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
