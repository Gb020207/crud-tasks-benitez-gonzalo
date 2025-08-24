import { Rank } from "../models/rank.models.js";

export const createRank = async (req, res) => {
    const { name, description, level } = req.body;
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
        if (level === undefined || level === "") {
            return res.status(400).json({
                msg: "El usuario requiere un nivel"
            })
        }
        const rank = await Rank.create({ name, description, level});
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
        return res.status(200).json(rank);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"No se encontro ningun rango coloque un id existente"
        })
    }
    
};
export const updateRankById = async (req, res) => {
    const { id } = req.params;
    const { name, description, Level } = req.body;
    try {
        const rank = await Rank.findByPk(id);
        if(!rank){
            return res.status(404).json({
                msg: "No se encontro el rango"
            })
        }
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
        if (level === undefined || Level === "") {
            return res.status(400).json({
                msg: "El usuario requiere un nivel"
            })
        }
        await Rank.update({ name, description, Level }, { where: { id } });
        return res.status(200).json({
            msg: "Se ha actualizado el rango correctamente"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "No se pudo actualizar el rango"
    })
}
}
export const deleteRankById = async (req, res) => {
    const { id } = req.params;
    try {
        const rank = await Rank.findByPk(id);
        if (!rank) {
            return res.status(404).json({
                msg: "No se encontro el rango"
            })
        }
        await Rank.destroy({ where: { id } });
        return res.status(200).json({
            msg: "Se ha eliminado el rango correctamente"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "No se pudo eliminar el rango"
        })
    }
};
