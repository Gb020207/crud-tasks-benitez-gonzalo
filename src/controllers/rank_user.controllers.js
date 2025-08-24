import RankUser from "../models/rank_user.models.js";
import User from "../models/user.models.js";
import { Rank } from "../models/rank.models.js";

export const getAllUserRanks = async (req, res) => {
    try {
        const userRanks = await RankUser.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] }
                }
                ,
                {
                    model: Rank,
                    as: 'rank'
                }
            ]
        }
    )
        return res.status(200).json(userRanks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error al obtener los rangos de usuario"
        });
    }
};
export const createUserRank = async (req, res) => {
    const { userId, rankId } = req.body;
try {
   const user = User.findByPk(userId);
   const rank = Rank.findByPk(rankId);
   if(!user || !rank){
    return res.status(404).json({
        msg: "Usuario o Rango no encontrado"
    })
   }
   const newUserRank = await RankUser.create({userId, rankId});
   return res.status(201).json(newUserRank);
    
} catch (error) {
    console.error(error);
    return res.status(500).json({
        msg: "Error al asignar rango a usuario"
})
}
};