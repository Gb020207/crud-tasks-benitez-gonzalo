import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.models.js";

export const Rank = sequelize.define("Rank", {
    name: { type: DataTypes.STRING, allowNull:false},
    description: { type: DataTypes.STRING, allowNull:false},
    Level: { type: DataTypes.INTERGER, allowNull:false, defaultValue: 1},
})

// Relaciones
Rank.belongsToMany(User, { through: 'Userrank', foreignKey: 'rankId',as : 'ranks' });
User.belongsToMany(Rank, { through: 'Userrank', foreignKey: 'userId', as : 'users'});
