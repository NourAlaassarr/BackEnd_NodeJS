import { UserModel } from "../../DB/models/user.model.js"
import {PostModel} from '../../DB/models/post.model.js'
// get all user 
const getall= async(req,res,next)=>{
    try {
const Get= await UserModel.find()
res.json({Message:'done',Get})
    }catch (error) {
        return res.json({Message:'Error',
        Error:error})
    
}
}

//signup
const signup = async(req,res,next)=>
{
    const {username,email,password,phone,gender,age}=req.body
try{
    // const check = await UserModel.findOne({$or: [{username},{email},{phone}]})
    const checkEmail = await UserModel.findOne({ email });
if (checkEmail) {
    return res.json({ Message: 'Email already exists' });
}

const checkUsername = await UserModel.findOne({ username });
if (checkUsername) {
    return res.json({ Message: 'Username already exists' });
}

const checkPhone = await UserModel.findOne({ phone });
if (checkPhone) {
    return res.json({ Message: 'Phone number already exists' });
}

const add = await UserModel.create(req.body)
    return res.json({Message:'Added'})
}
catch(Error)
{  
    res.json({ Message: 'Error', Error: Error });}
}


//signin
const signin = async(req,res,next)=>{
    const{username,email,password,phone}=req.body
    try{
        const user = await UserModel.findOne({ $or: [{ email,password }, { username,password }, { phone,password }] });

        if (user) {
        const { username } = user;
        return res.json({ message: `Welcome back ${username}!`, user });
        }
    
        return res.json({ message: 'Invalid credentials' });
    }
    catch(err)
    {
        res.json({Message:'Error',Error:err})

    }
}

// delete user
const deleteUser = async(req,res,next)=>
{
    const{_id}=req.params
    try
    {
        const check = await UserModel.findByIdAndDelete(_id)
        if(!check)
        {
            return res.json({Message:'Invalid ID, please check and try again'})
        }
        return res.json({Message:'Deleted successfully'})
    }
    catch(err)
    {
        return res.json({Message:'Error',Error:err})
    }
    

}

// update user
const updateUser = async (req,res,next)=>
{
const{age,password,city }=req.body
const{_id}=req.params
try{
    // const check = await UserModel.findById(_id);

    // if (!check) {
    // res.json({ message: 'Invalid ID, please check and try again' });
    // return;
    // }

const user = await UserModel.findByIdAndUpdate({_id},{age,password,city})
if(!user)
{ 
    return res.json({ message: 'Invalid ID, please check and try again' });
}
res.json({Message:'Updated'})
}
catch(err)
{
    return res.json({ message: 'Fail', Error: err })
}
}


// search for user where his name start with "X" and age less than Y=>   (X,Y => variables)
const Search = async(req,res,next)=>
{
    const {nameStart,age}=req.query
    try{
        const search = await UserModel.find({ $and: [{ username: { $regex: `^${nameStart}`, $options: 'i' } }, { age: age }] });

        if(search.length !=0){
            return res.json({ message: 'done',search });
        }
        return res.json({Message:'user not found '})
        
    }
    catch(err)
    {
        return res.json({ message: 'Error',error:err });
    }
}


// search for user where his age is between X and Y
const ageBetween = async (req,res,next)=>
{
    const{minage,maxage}=req.query
    try{
    const search = await UserModel.find({ age: { $gte: minage, $lte: maxage } })
    return res.json({ message: 'done',search});
    }
    catch(err)
    {
        return res.json({ message: 'Error',error:err });
    }
}


const join = async (req, res, next) => {
    try{
        const products = await PostModel.find({})
        .populate([
        { 
            path: 'UserId',
        // select: 'username email' 
    },
        ])
        .exec();
    return res.json({ message: 'done',products});
    }
    catch(err)
    {
        return res.json({ message: 'Error',error:err });
    }

}



export {
    getall,
    signup,
    signin,
    ageBetween,
    Search,
    deleteUser,
    updateUser,
    join,
}