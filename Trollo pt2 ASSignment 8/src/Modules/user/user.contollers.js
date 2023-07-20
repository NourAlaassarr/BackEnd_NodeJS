import {UserModel}from '../../../DB/Models/user.Model.js'
import bcrypt from 'bcrypt'
import Jwt  from 'jsonwebtoken'

import { asyncHandler } from '../utlis/ErrorHandling.js'
import { sendmailService } from '../../Services/SendEmailService.js'

//1-signUp 
export const signUp= async(req,res,next)=>
{
    const {username,email,password,Cpassword,gender,age,phone, FirstName, LastName}=req.body
        
        const Check = await UserModel.find({email})
        if(Check.length>0)
        {
        return res.json({Message:'Email already exists,signin instead'})
        }
        const Phonecheck = await UserModel.find({phone})
        if(Phonecheck.length >0)
        {
        return res.json({Message:'phone number already used'})
        }

        if(password!=Cpassword)
        {
            return res.json({Message:'Password doesn\'t match.!'})
        }
        //confirm email
        const token = Jwt.sign({email, id:Check._id},process.env.CONFIRMATION_EMAIL_TOKEN,{
            expiresIn: '1h',})
            const confirmlink= `http://localhost:3000/user/ConfirmEmail/${token}`
            const message = `<a href=${confirmlink}> Click to confirm your email </a>`
            const isEmailSent = await sendmailService({
                message,
                to:email,
                subject:'confirmation email'
            })
            if (!isEmailSent) {
                return res.json({ message: 'Please try again later or contact the support team' })
            }

        // await sendmailService({
        //     to:email,
        //     message:`<h1>test sendEmail <h1>`,
        //     subject:'TEST'

        // })
        const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
        const UserInstance = new UserModel({username,email,password:hashedPassword,Cpassword:hashedPassword,gender,Age:age,phone, FirstName, LastName})
        await UserInstance.save()
        return res.json({ message: 'Done', UserInstance })
}

export const confirm = async(req,res,next)=>
{
    const{token}=req.params
    if(!token)
    {
        return res.json('token not provided')
    }
    const decodeddata = Jwt.verify(token,process.env.CONFIRMATION_EMAIL_TOKEN)
    const conf = await UserModel.findOne({email:decodeddata.email})
    if (conf.isConfirmed) {
        return res.status(400).json({ message: 'Your email is already confirmed' })
    }
    const user = await UserModel.findOneAndUpdate(
        { email: decodeddata.email },
        { isConfirmed: true },
        {new: true},
    )
    res.json({ message: 'Confirmed successfully please try to login', user })
    }

// 2-login-->with create token
export const login = async (req,res,next)=>{

        const {email,password}=req.body
        const userExist = await UserModel.findOneAndUpdate({email},{isOnline:true,isDeleted:false,isConfirmed:true})
        if(!userExist)
        {
            return res.json({Message:'invalid-User Credentials'})
        }
        const MatchPass = bcrypt.compareSync(password,userExist.password)
        if(!MatchPass)
        {
            return res.json({Message:'invalid-User Credentials'})
        }
        const token = Jwt.sign({name:userExist.username,id:userExist._id,isLoggedin:true},'hoho')

        res.json({ message: 'successfully logged-IN',token })

    
}

// 3-change password (user must be logged in)
export const change= async(req,res,next)=>
{
    const {oldPassword,newPassword,CNPassword}=req.body
        const {_id} = req.authUser

        const user = await UserModel.findById(_id)
        if(!user)
        {
            return res.json({message: 'NoT found.'})
        }
        
        if(!user.isOnline)
        {
            return res.json({ message: 'Please log-in first'});
        }
        if(user.isDeleted)
        {
            return res.json({ message: 'User Soft Deleted Please log-in first'});
        }
        
        const hashed = bcrypt.compareSync(oldPassword,user.password)
        if(!hashed)
        {
            return res.json({ message: 'Old Password Doesn\'t match' })
        }
        if(newPassword!=CNPassword)
        {
            return res.json({ message: 'password doesn \'t match'})
        }
        const encode = bcrypt.hashSync(newPassword,+process.env.SALT_ROUNDS)
        const update = await UserModel.updateOne({_id},{
            password:encode,
            Cpassword:encode
        })
        return res.json({ message: 'changed successfully',update})       
}

// 4-update user (age , firstName , lastName)(user must be logged in)
export const Update= async(req,res,next)=>
{
    const{FirstName,LastName,Age,phone,username}=req.body
    const {_id}=req.authUser
        const findUser = await UserModel.findById(_id);
        if (!findUser) {
            return res.json({ message: 'User not found.' });
        }
        if(!findUser.isOnline )
        {
            return res.json({ message: 'Please log-in first'});
        }
        if(findUser.isDeleted)
        {
            return res.json({ message: 'User Soft Deleted Please log-in first'});
        }
    const checkPhone = await UserModel.findOne({ phone :phone });
    if (checkPhone) {
    return res.json({ message: 'Failed. Phone number already exists.' });
    }
        const updateUser = await UserModel.findByIdAndUpdate({_id },{
            FirstName,
            LastName,
            Age,
            phone,
            username,
            phone
        })
        return res.json({message: 'Succeffully updated',updateUser}) 
}

// 5-delete user(user must be logged in)
export const deleteuser =async (req,res,next)=>
{
        const {_id}=req.authUser
        const finduser=await UserModel.findOne({_id})
        if(!finduser)
        {
            return res.json({ message: 'User not found.' });
        }
        if(!finduser.isOnline)
        {
            return res.json({ message: 'Please log-in first'});
        
        }
        if(finduser.isDeleted)
        {
            return res.json({ message: 'User Soft Deleted Please log-in first'});
        }
        const user=await UserModel.deleteOne({_id})
        return res.json({ message: 'Deleted successfully',Delete:user.deletedCount });

}

// 6-soft delete(user must be logged in)
export  const softDelete= async(req,res,next)=>{
    
        const {_id}=req.authUser
        const user = await UserModel.findById({_id})
        
        if(!user)
        {
            return res.json({message: 'User not found'})
        }
        if(!user.isOnline)
        {
            return res.json({ message: 'Please log-in first'});
        }
        const UserOffline = await UserModel.updateOne({_id},{
            isDeleted:true
        })
        if(UserOffline.modifiedCount)
        {
            return res.json({message: 'soft deleted  successfully',UserOffline})
        }
        return res.json({message: 'failed'})
}



// 7-logout
export const logout =async (req,res,next)=>
{
    const {_id}=req.authUser
        const user = await UserModel.findById({_id})
        if(!user)
        {
            return res.json({message: 'User not found'})
        }
        if(user.isDeleted)
        {
            return res.json({ message: 'User Soft Deleted Please log-in first'});
        }
        const UserOffline = await UserModel.updateOne({_id},{
            isOnline:false
        })
        if(UserOffline.modifiedCount)
        {
            return res.json({message: 'Logged Out successfully',UserOffline})
        }
        return res.json({message: 'failed'})
        
}
 // if (findUser._id.toString() !== _id) {
        //     return res.json({ message: 'Unauthorized access.' });
        // }