import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        title:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        content:
        {
            type:String,
            trim:true

        },
        UserId:
        {
            type:Schema.Types.ObjectId,
            ref:'user',
            
        },
    },
    {
        timestamps:true,
    }
)
export const PostModel =mongoose.model('post',PostSchema)