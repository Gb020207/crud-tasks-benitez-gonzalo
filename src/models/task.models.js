import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.models.js";
const Task = sequelize.define("Task", {
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false,unique:true},
    isComplete:{type:DataTypes.BOOLEAN,defaultValue:false},

},
{
    timestamps: false
}
);

Task.belongsTo(User, { foreignKey: 'userId', as: 'author'});
User.hasMany(Task, { foreignKey: 'userId'});




export default Task;