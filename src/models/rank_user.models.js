import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import  User from "./user.models.js";
import { Rank } from "./rank.models.js";
const RankUser = sequelize.define("UserRank", {
    userId: { type: DataTypes.INTEGER,primaryKey: true ,allowNull: false },
    rankId: { type: DataTypes.INTEGER,primaryKey: true ,allowNull: false },
},
{
    timestamps: false
}
);
Rank.belongsToMany(User, { through: RankUser, foreignKey: 'rankId', as: 'users' });
User.belongsToMany(Rank, { through: RankUser, foreignKey: 'userId', as: 'ranks' });

export default RankUser;

RankUser.belongsTo(Rank, { foreignKey: 'rankId', as: 'rank' });
RankUser.belongsTo(User, { foreignKey: 'userId', as: 'user' });
