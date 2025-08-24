import Reward from "../models/reward.models.js";
import { Rank } from "../models/rank.models.js";
export const getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.findAll({
            include: [
                { model: Rank, 
                    as:'rank',
                    attributes: ['id', 'name', 'description', 'Level']

                }
                
            
            ]

        });
        return res.status(200).json(rewards);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al obtener las recompensas"
        });
    }
}
export const createReward = async (req, res) => {
    const {name, levelRequierd , rankId} = req.body;
    try {
        const rank = await Rank.findByPk(rankId);
        if(!rank){
            return res.status(404).json({
                msg: "No se encontro el rango"
            })
        }
        try {
            const newReward = await Reward.create({name, levelRequierd, rankId});
            return res.status(201).json({
                msg: "Recompensa creada con exito",
                data: newReward
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: "Error al crear la recompensa"
            });
        } 
       
} catch (error) {
            console.error(error);
}
}


export const getRewardById = async (req, res) => {
    const { id } = req.params;
    try {
        const reward = await Reward.findByPk(id, {
            include: [
                { model: Rank, 
                    as:'rank',
                    attributes: ['id', 'name', 'description', 'Level']

                }
                
            
            ]
        });
        if(!reward){
            return res.status(404).json({
                msg: "No se encontro la recompensa"
            })
        }
        return res.status(200).json(reward);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al obtener la recompensa"
        });
    }
}

