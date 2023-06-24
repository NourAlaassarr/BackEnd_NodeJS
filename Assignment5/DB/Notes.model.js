import { SeqInstance } from "../Connection.js";
import {  DataTypes } from "sequelize";
import { userModel } from "./User.model.js";

export const NoteModels = SeqInstance.define('note',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    title:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,
    },
    content:{
        type:DataTypes.STRING(255),
    },
    

},
{
    timestamps:true
})
userModel.hasMany(NoteModels,
{
    onDelete:'Cascade',
    onUpdate:'Cascade'
})
NoteModels.belongsTo(userModel)

console.log(NoteModels==SeqInstance.models.note)