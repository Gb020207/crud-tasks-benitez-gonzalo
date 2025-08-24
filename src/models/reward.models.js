import { DataTypes } from "sequelize"
import sequelize from "../config/database.js";
import { Rank } from "./rank.models.js";
const Reward = sequelize.define("Reward", {
    name: { type: DataTypes.STRING, allowNull: false},
    levelRequired: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    rankId: { type: DataTypes.INTEGER, allowNull: false, unique:true},
},
{
    timestamps: false
});



Reward.belongsTo(Rank, { foreignKey: 'rewardId', as: 'rank' })
Rank.hasOne(Reward, { foreignKey: 'rewardId' });

export default Reward;