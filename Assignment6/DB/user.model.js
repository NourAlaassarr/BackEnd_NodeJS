import mongoose, { Mongoose, Schema } from "mongoose";
const UserSchema = new Schema(


    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        city:{
            type:String,
            default:'Cairo'
        },
        password:
        {
            type:String,
            required:true

        },
        age:{
            type:Number

        },
        gender:{
            type:String,
            lowercase:true,
            enum:['female','male','not specified'],
            default:'not specified'
        },
        phone:{
            type:String,
            unique:true,
            required:true

        },
        confirmedEmail:{
            type:Boolean,
            default:false
        },
        // posts:[{
        //     type:Schema.Types.ObjectId,
        //     ref:'post',
        // }]

    },
    {
        timestamps:true
    }
)

export const UserModel = mongoose.model('user',UserSchema)