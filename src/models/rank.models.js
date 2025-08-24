import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


export const Rank = sequelize.define("Rank", {
    name: { type: DataTypes.STRING, allowNull:false},
    description: { type: DataTypes.STRING, allowNull:false},
    level: { type: DataTypes.INTEGER, allowNull:false, defaultValue: 1},
},
{    
    timestamps: false
}
)


