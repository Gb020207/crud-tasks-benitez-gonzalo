import { Rank } from "../models/rank.models.js";

export const createRank = async (req, res) => {
    const { name, description, Level } = req.body;
    try {
        if (name === undefined || name === "") {
            return res.status(400).json({
                msg: "Name no puede ser nulo"
            })
        }
        if (description === undefined || description === "") {
            return res.status(400).json({
                msg: "Hace falta una descripcion"
            })
        }
        if (Level === undefined || Level === "") {
            return res.status(400).json({
                msg: "El usuario requiere un nivel"
            })
        }
        const rank = await Rank.create({ name, description, Level});
        try {
            return res.status(201).json({
                msg:"Se ha creado el rango correctamente"
            })
        } catch (error) {
            return res.status(500).json({
                msg: "No se creo el rango"
            }
            )
            
        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se pudo crear el rango complete todos los campos"
        })
    }
    
} 

export const getAllRanks = async (req, res) => {
    try {
        const rank = await Rank.findAll();
        return res.json({
            count: rank.length,
            data: rank
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: "no se encontro ningun rango"
    })
}
};

export const getRankById = async (req, res) => {
    const { id } = req.params;
    try {
        const rank = await Rank.findByPk(id);
        if (!rank){
            return res.status(404).json({
                msg: "No se encontro el rango"
            })
        }
    } catch (error) {
        
    }
    
}