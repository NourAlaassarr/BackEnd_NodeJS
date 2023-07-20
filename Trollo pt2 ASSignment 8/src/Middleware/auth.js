import { UserModel } from "../../DB/Models/user.Model.js"
import {TaskModel}from "../../DB/Models/Task.Model.js"
import Jwt  from "jsonwebtoken"


export const isAuth = ()=>{
    return async(req,res,next)=>{

        const token = req.headers.token
        if(!token)
        {
            return res.json({message: 'No token provided.'})
        }
        const decoded=Jwt.verify(token,process.env.SIGN_IN_TOKEN_SECRET)
        if(!decoded || !decoded.id)
        {
            return req.json({Message:'error invalid token!'})
        }
        const findUser = await UserModel.findById(decoded.id);
        req.authUser=findUser
        next()
    }
}