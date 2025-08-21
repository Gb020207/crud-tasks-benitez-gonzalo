import RankUser from "../models/rank_user.models.js";

export const getAllUserRanks = async (req, res) => {
    try {
        const userRanks = await RankUser.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] }
                }
            ]
        }
    )
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
    
} catch (error) {
    
}
}