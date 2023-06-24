import {userModel} from '../../DB/Models/User.model.js'
import { Sequelize,Op } from 'sequelize'

//GetAll users
const GetUsers = async(req,res,next)=>{
    const users = await userModel.findAll()
    return res.json({Message:'Done', users:users})
}

//SignUp
const signup = async(req,res,next)=>{
const {name,email,password,age}=req.body
// console.log({name,email,password,age})
try{

const add = await userModel.create(req.body)
res.json({ Message: 'User Added', User: add })
}
catch(err){
    res.json({ message: 'Error', error: err })
}
}

//SignIn
const Signin = async (req,res,next)=>{
const {name,email,password,age}=req.body
try{
    const user = await userModel.findOne({where: {
        email:req.body.email,
        password:req.body.password
    }})
    if (user == null)
    {
        const check = await userModel.findOne({where:{
            email:req.body.email
        }})
        if(check == null)
        {
            return res.json({Message:'User Not Found, Please Sign Up'})
        }
        return res.json({Message:'Incorrect Password'})
    }
    else 
    {
        res.json({Message:'user found, and signed in',user})}
}
catch(err){
res.json({Message:'Error',err})
}
}


//search for user where his name start with "a" and age less than 30 // fixed 
const Search = async(req,res,next)=>{
try{
    const get = await userModel.findAll({
        where:{
        age:{
            [Op.lt]:30
        },
        name:{
            [Op.like]:'a%'
        }

    }})
    if(get.length===0)
    {
        return res.json({message:'User not found'})
    }
    
    return res.json({message:'User  found',get})
    

}
catch(err)
{
    res.json({Message:'Error', error:err})
}
    
}
//search for user where his name start with "a" and age less than 30 // fixed 
export const SearchParam = async(req,res,next)=>{
    const{age,letter}=req.query
    try{
        const get = await userModel.findAll({
            where:{
            age:{
                [Op.lt]:age
            },
            name:{
                [Op.like]:`${letter}%`
            }
    
        }})
        if(get.length===0)
        {
            return res.json({message:'User not found'})
        }
        
        return res.json({message:'User  found',get})
        
    
    }
    catch(err)
    {
        res.json({Message:'Error', error:err})
    }
        
    }

// search for user where his age is between 20 and 30 
const SearchBetween = async(req,res,next)=>{
    const {age}=req.body
    try{
    const Between = await userModel.findAll({
        where:{
            age:{
                [Op.between]:age
            }
        }
    })
    if(Between.length ===0 )
    {
        return  res.json({Message:'Doesnt exist'})
    }
    return res.json({Message:'Done',Between})

}
catch(err)
{
    res.json({Message:'Error',err})
}
}

//search for users by list of ids => using IN
const SearchIn = async (req,res,next)=>{
    const {id}= req.body
    try{
        const get = await userModel.findAll({where:{
        id:{
            [Op.in]:req.body.id
        }
        }})
        if(get.length===0)
        { 
            res.json({Message:'  Ids Not found'})
        }
        else
        {
        res.json({Message:'Done',Users:get})
    }

    }
    catch(err)
    {
        return res.json({Message:'Error',error:err})
    }
}

//update user name or password
const update = async (req,res,next)=>
{
    const {name,password,email,age}=req.body
    try{
        const check = await userModel.findAll({
            where:{
                email:email
            }
        })
        if (check.length ===0)
        {
            res.json({Message:'User not found'})}
        else if (check.length){
            const checking = await userModel.findAll({
                where:{
                    name:name,
                    password:password,
                    age:age
                }
            })
            if(checking.length)
            {
                return res.json({Message:'User is up to date'})
            }
            const user = await userModel.update({
            name,password,age
        },
        {
            where:{
            email:email,
            }
        }
        )
        res.json({Message:'Updated',User:user})
    }
}

    catch(err)
    {
        res.json({Message:'Error',err})
    }
}

//delete user
const Deleted = async(req,res,next)=>
{
    const {email,name,password}=req.body
    try{
        const check = await userModel.findAll({
            where:{
                email:email
            }
        })
        if(check.length===0)
        {
            return res.json({Message:'user not found'})
        }
        const dest = await userModel.destroy(
            {
                where:{
                    email:email
                }
            }
        )
        res.json({message:'Deleted successfully'})

    }
    catch(err){
        res.json({Message:'Error',err})

    }
}

//get the 3 oldest users
const SearchOldest = async(req,res,next)=>{
    const {name,age,email,password}=req.body
    try{
    const oldest = await userModel.findAll({
        order: [['age', 'DESC']],
        limit: 3
    })
    res.json({Message:'done',oldest})

    }

catch(err){
    res.json({Message:'Error',err})

}



}

export{
signup,
GetUsers,
Signin,
Search,
SearchIn,
SearchOldest,
SearchBetween,
update,
Deleted,
}