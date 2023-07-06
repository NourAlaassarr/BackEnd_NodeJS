import {PostModel} from '../../DB/models/post.model.js'
import { UserModel } from '../../DB/models/user.model.js'

//Add post
const Add= async(req,res,next)=>
{
    const {title,content,UserId}=req.body
    try{
        const User=await UserModel.findById(UserId)
        if(!User)
        {
            return res.json({Message:'User not found.!'})
        }
        const check=await PostModel.findOne({title})
        if(check)
        {
            return res.json({Message:'Title already exists'})
        }
        const PostInstance=new PostModel({title,content,UserId})
        await PostInstance.save()
        // await UserModel.findByIdAndUpdate(
        //     UserId,
        //     { $push: { posts: PostInstance._id } },
        //     { new: true }
        // );
        return res.json({Message:'Added successfully'})

    }
    catch(err)
    {
        console.log(err)
        return res.json({Message:'Error',error:err})
    }

}

//delete post (post creator only )
const dele= async(req,res,next)=>
{
    try{
    const{_id}=req.params
    const{UserId}=req.body
    const ifuser =await PostModel.findOne({_id})
    if(!ifuser)
    {
        return res.json({Error:"Not found"})
    }
    const check = await PostModel.findOneAndDelete({_id,UserId})
    if(!check)
    {
        return res.json({Error:"Request prohibited!. you are not the owner"})
        
    }
    return res.json({Message:"Deleted"})
}
    
catch (error) {
    return res.json({Message:"Failed",error})
}
}

//update post (post owner only)
const Updated= async(req,res,next)=>
{
    const{content,UserId}=req.body
    const{_id}=req.params
    try {
        const ifuser =await PostModel.findOne({_id})
        if(!ifuser)
        {
            return res.json({Message:"Not found"})
        }
        const check= await PostModel.findOneAndUpdate({_id,UserId},{content})
        if(!check)
        {
            return res.json({Error:"Request prohibited!. you are not the owner"})
        
        }
        return res.json({Message:"Updated"})
        
    } catch (error) {
        return res.json({Message:"Failed",error})
    }
    }

// get all posts
const get =async (req,res,next)=>
{
    try {
        const get=await PostModel.find()
        return res.json({Message:"done",get})

        
    } catch (error) {
        return res.json({Message:"Failed",error})
    }
}

// sort posts descending (By date)
const Getsort=async(req,res,next)=>
{
    try {
        const sort = await PostModel.find().sort({
            createdAt:-1 //-1 for desc and 1 for asc

        })
        if(! sort)
        {
            return res.json({Message:'no posts found'})
        }
        return res.json({Message:"done",sort})

        
    } catch (error) {
        return res.json({Message:"Failed",error})
    }
}

// get all posts with their owners informaion (using populate)
const GetAll = async(req,res,next)=>
{
    try {
        const posts = await PostModel.find().populate([{
            path:'UserId',
            
        }])
        return res.json({Message:"Done",posts})
        
    } catch (error) {
        console.log(error)
        return res.json({Message:"Failed",error})
    }

}




export
{
    Add,
    get,
    Updated,
    dele,
    Getsort,
    GetAll,
}