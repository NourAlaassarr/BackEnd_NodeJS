import {NoteModels} from '../../DB/Models/Notes.model.js'
import { Sequelize, Op } from 'sequelize'
import { userModel } from '../../DB/Models/User.model.js'

//add note
export const add = async(req,res,next)=>
{
const {title,content,userId}=req.body
try
{
    const note = await NoteModels.create(req.body)
    return res.json({Message:'added',notes:note})
    }

catch(err){
    res.json({Message:'ERROR',error:err})

}
}
//delete note (note creator only )
export const Deleted = async(req,res,next)=>
{
    const {title,content,userId}=req.body
    try{
        const check = await NoteModels.findAll({
            where:{
                title:title,
            }
        })
        if(check.length === 0)
        {
            res.json({Message:'not found'})
        }
        else
        {
            const checks = await NoteModels.findAll({
                where:{
                    userId:userId
                }
            })
            if(checks.length===0)
            {
                return res.json({Message:'sorry,owner only can do this action'})
            }
            const dele = await NoteModels.destroy({
                where:{
                    title:title,
                    userId:userId
                }
            })
            res.json({Message:'Deleted successfully'})

        }
    
    }
    catch(err){
        res.json({Message:'ERROR',error:err})
    
    }
}

//get all notes
export const Get =async(req,res,next)=>{
    try{
    const Gets=await NoteModels.findAll()
    res.json({Message:'Done',Notes: Gets})
    }
    catch(err){
        res.json({Message:'ERROR',error:err})
    
    }
}
//update note (note owner only) update contents only)
export const Update = async(req,res,next)=>{
    const {title,content,userId}=req.body
    try{
        const check = await NoteModels.findAll({
            where:{
                title:title}
        })
        if(check.length===0)
        {
            res.json({Message:'not found'})
        }
        else{
            const checka=await NoteModels.findAll({
                where:{
                    userId:userId
                }
            })
            if(checka.length===0)
            {
                return res.json({Message:'sorry,owner only can do this action'})
            }
            const up=await NoteModels.update({
                content

            },
            {
                where:{
                    userId:userId,
                    title:title
                }
            })
            res.json({Message:'Updated'})

        }

    }
    catch(err)
    {
        res.json({Message:'ERROR',Error:err})
    }
}
//get all notes with their owners informaion (using include) // details of notes with users
export const Getinclude= async(req,res,next)=>{
    try{
        const check = await NoteModels.findAll({
            include: {
                model: userModel,
                foreignKey: 'userId',
                require:true,
                
                
            }


})
res.json({message:'notesWithOwners',check});
    }
    catch(err){
        console.error(err)
        res.json({Message:'ERROR',error:err})
    
    }
}
//get all notes with their owners informaion (using include) //specific attributes from user
export const GetSpecific= async(req,res,next)=>{
    try{
        const check = await NoteModels.findAll({
            include: [
                {
                model: userModel,
                foreignKey: 'userId',
                required: true,
                attributes: ['email', 'name'] 
                }
            ]
            })
            
res.json({message:'notesWithOwners',check});
    }
    catch(err){
        console.error(err)
        res.json({Message:'ERROR',error:err})
    
    }
}