import {TaskModel} from '../../../DB/Models/Task.Model.js'
import  Jwt from 'jsonwebtoken'
import { UserModel } from '../../../DB/Models/user.Model.js'

// 1-add task with status (toDo)(user must be logged in)   //na2s hett el date lw valid or not
export const addtask = async (req,res,next)=>{
    const {title,description,deadline,assignTo}=req.body
    const {_id}=req.authUser

const checkuser=await UserModel.findById({_id})
const user=await UserModel.findOne({_id:assignTo})
const checktitle=await TaskModel.findOne({title})
const timestamp = Date.parse(deadline)
if (isNaN(timestamp) || timestamp < Date.now()) {
    return res.json({ Message: 'Invalid date or date is in the past' })
}
if(checktitle)
{
    return res.json({Message:'title already exist'})
}
if(!user )
{
    return res.json({Message:' assigned to user doesn\'t exist'})
}
if(!checkuser )
{
    return res.json({Message:'user doesn\'t exist'})
}
if(!checkuser.isOnline || checkuser.isDeleted)
{
    return res.json({Message:'Please sign in first'})
}
const taskInstance= new TaskModel({title,description,deadline,assignTo,userId:_id})
await taskInstance.save()

return res.json({Message:'done',taskInstance})
}


//2-update task (title , description , status) and assign task to other user(user must be logged in) (creator only can update task)
export const UpdateTask=async(req,res,next)=>
{
const {title,description,status,deadline,assigTo}=req.body
const {IDTask}=req.params
const {_id}=req.authUser

const User=await UserModel.findById({_id})
const checktitle=await TaskModel.findOne({title})
const findtask=await TaskModel.findById({_id:IDTask})
const timestamp = Date.parse(deadline)
if (isNaN(timestamp) || timestamp < Date.now()) {
    return res.json({ Message: 'Invalid date or date is in the past' })
}
if(!findtask)
{
    return res.json({Message:'task doesn\'t exist'})
}
if(checktitle)
{
    return res.json({Message:'title already exist'})
}
if(!User )
{
    return res.json({Message:'user doesn\'t exist'})
}

if(!User.isOnline || User.isDeleted)
{
    return res.json({Message:'Please sign in first'})
}
if(!_id == findtask.userId )
{
    return res.json({Message:'failed not authorized '})
}

const tobeupdated = await TaskModel.findByIdAndUpdate(IDTask,{
title,
description,
status,
deadline,
assigTo
},{new:true})
return res.json({Message:'Done',Updated:tobeupdated})
}



// 3-delete task(user must be logged in) (creator only can delete task)
export const DeleteTask=async(req,res,next)=>
{
    const {IDTask}=req.params
    const {_id}=req.authUser


const User=await UserModel.findById(_id)
const findtask=await TaskModel.findById(IDTask)
console.log(IDTask)
if(!findtask)
{return res.json({Message:'task doesn\'t exist'})}

if(!User )
{return res.json({Message:'user doesn\'t exist'})}

if(!User.isOnline || User.isDeleted)
{return res.json({Message:'Please sign in first'})}

if(_id == findtask.userId.toString() )
{const deleted = await TaskModel.findByIdAndDelete(IDTask)
return res.json({Message:'successfully deleted',})}

return res.json({Message:'Failed unauthorized',})
}


// 4-get all tasks with user data  
export const GetAllWithUserData= async(req,res,next)=>
{
const Getall= await TaskModel.find().populate([
    { path: 'userId', select: 'username email _id' },
    { path: 'assignTo', select: 'username email _id' }
])
return res.json({Message:'done',Getall})
}


// 5-get tasks of oneUser with user data (user must be logged in) //get all tasks assign to me
export const getUserData = async (req,res,next)=>
{
    const {_id}=req.authUser

    const checkuser=await UserModel.findById({_id})
    if(!checkuser )
{
    return res.json({Message:'user doesn\'t exist'})
}
if(!checkuser.isOnline || checkuser.isDeleted)
{
    return res.json({Message:'Please sign in first'})
}
const GEt = await TaskModel.find({ assignTo: _id }).populate([
    { path: 'userId', select: 'username email _id' },
    { path: 'assignTo', select: 'username email _id' }
])
return res.json({Message:'done',GEt})

}


// 6-get all tasks that not done after deadline // "get all late tasks
export const Late = async (req, res, next) => {
    const {_id}=req.authUser
    const checkuser = await UserModel.findById(_id);
    if (!checkuser) {
    return res.json({ Message: 'User not found' });
    }
    const tasks = await TaskModel.find({
    $or: [{ assignTo: _id }, { userId: _id }],
    deadline: { $lt: Date.now() },
    status: { $ne: 'done' }
    });
    res.json({ Message: 'Done', tasks });
};


//7 get all  tasks
export const GetAll= async(req,res,next)=>
{
const Get= await TaskModel.find()
return res.json({Message:'done',Get})
}

//8-get all created tasks
export const getCreated = async (req,res,next)=>
{
    const {_id}=req.authUser

const user= await UserModel.findById(_id)
if(!user){
    return res.json({Message:'user not found '})
}
if(!user.isOnline || user.isDeleted)
{
    return res.json({Message:'Please sign in first'})
}
const get = await TaskModel.find({ userId: _id }).populate([
    { path: 'userId', select: 'username email _id' },
    { path: 'assignTo', select: 'username email _id' }
])
return res.json({Message:'done',get})
}
