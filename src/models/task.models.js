import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const Task = sequelize.define("Task", {
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false,umique:true},
    isComplete:{type:DataTypes.BOOLEAN,defaultValue:false},

});
export default Task;