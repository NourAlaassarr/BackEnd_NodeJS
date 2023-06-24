import { DataTypes} from "sequelize"
import { SeqInstance } from "../Connection.js"

export const userModel = SeqInstance.define('user',{
    id:{
        type:DataTypes.INTEGER(),
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING(255),

    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,

    },
    password:{
        type:DataTypes.STRING(255),
        allowNull:false

    },
    age:{
        type:DataTypes.INTEGER,
        
    }
},
{
    timestamps:true,
}
)
console.log(userModel== SeqInstance.models.user)