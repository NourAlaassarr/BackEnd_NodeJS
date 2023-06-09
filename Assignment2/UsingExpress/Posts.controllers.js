//Api logic (function)
const Post = [
    {
    id: 1,
    Title: "love",
    Describtion: "post about love",
    },
    {
    id: 2,
    Title: "hate",
    Describtion: "post about hate",
    },
    
];

//Get all posts
const GetPosts=(req,res,next)=>{
    res.json({Message:"ALL Posts",Post})

}
//Get All posts Sorted by Id
const GetReversed=(req,res,next)=>{
    const Array2=[...Post]
    Array2.reverse()
    res.json({Message:"Reversed array",Array2})
}

//AddPost
const Add = (req,res,next)=>{
    const{Title,id,Describtion}=req.body
    const check = Post.find((post)=>
    {
        return post.Title == Title || post.id == id 
    })
    if(check)
    {
        res.json({Message:"Post alraedy exist"})
    }
    else
    {
        Post.push(req.body)
        res.json({Message:"Post Added successfully",Post})

    }
}
//Delete post
const Delete =(req,res,next)=>{
    const{Title,id,Describtion}= req.body
    const Deleted = Post.findIndex((post)=>{
        return post.id ==id && post.Title ==Title && post.Describtion==Describtion
    })
    if(Deleted !=-1)
    {
        Post.splice(Deleted,1)
        res.json({Message:"Post Deleted Successfully",Post})
    }
    else{
        res.json({Message:"Post Cannot be found "})
    }
}
//Update Post 
const Updated =(req,res,next)=>{
    const{id,Title,Describtion}=req.body
    const Up = Post.find((post)=>{
        return post.id == id && (post.Title!=Title || post.Describtion !=Describtion )
    })
    if(Up)
    {
        if(Up.Title!==Title)
        {
            Up.Title=Title
        }
        if(Up.Describtion!==Describtion)
        {
            Up.Describtion=Describtion
        }
        res.json({message:"Post updated successfully",Post})
    }
    else{
        res.json({message:" No change in the Post"})

    }


}

//Search by id using params
const searchbyid=(req,res,next)=>{
const{Id}=req.params
const Search = Post.find((post)=>{
    return post.id==Id
})

if(Search)
{
    res.json({Message:"Post Found",Search})
}
else
{
    res.json({Message:"Post doesn't exist"})
}

}
//Search by id using Query
const searchPostbyidQ=(req,res,next)=>{
    const{Id}=req.query
    const Search = Post.find((post)=>{
        return post.id==Id
    })
    
    if(Search)
    {
        res.json({Message:"Post Found",Search})
    }
    else
    {
        res.json({Message:"Post doesn't exist"})
    }
    
    }
    






module.exports= {
    GetPosts,
    GetReversed,
    Add,
    Delete,
    Updated,
    searchbyid,
    searchPostbyidQ,
}