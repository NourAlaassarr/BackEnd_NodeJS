//Api logic (function)
const Users = [
{
    id: 1,
    name: "nour",
    Email: "nour_ayman@gmail.com",
    },
    {
    id: 2,
    name: "Ayman",
    Email: "AymanAbdullah@gmail.com",
    },
];

//Get All users
const GetAllUsers = (req,res,next)=>{
res.json({message: "done",Users})
}

//Add new User
const AddUser = (req,res,next)=>{
const {Email}=req.body
const CheckUser = Users.find((user)=>{
    return user.Email == Email
})
if (CheckUser)
{
    res.json({Message:"User Already exist"})
}
else
{
    Users.push(req.body)
    res.json({Message:"User Added Successfully",Users})
}
}

//Get users sorted by  name
const Getallsorted = (req,res,next)=>
{
const sortedUsers = Users.slice().sort((a,b)=>a.name.localeCompare(b.name))
res.json({Message:"All sorted users",sortedUsers})
}

//Delete User
const DeleteUser = (req, res , next)=>{
const{Email}=req.body

const ChecktoDelete = Users.findIndex((user) => {
return user.Email === Email })

if(ChecktoDelete != -1)
{
    Users.splice(ChecktoDelete, 1);
    res.json({Message:"User Deleted",Users})
}
else
{
    res.json({Message:"User Not found"})
}
}

//search by id using query
const SearchbyIDquery = (req,res,next)=>{

    const {id}= req.query

    const Search = Users.find((user)=>{
        return user.id == id
    })
    
    if (Search)
    {
        res.json({Message:"User is found successfully",Search})
    }
    else{
        res.json({Message:"User is not found"})
    }
}


// search by id using parameter
const SearchbyID = (req,res,next)=>{
    const {id}= req.params
    const Search = Users.find((user)=>{
        return user.id == id
    })
    
    if (Search)
    {
        res.json({Message:"User is found successfully",Search})
    }
    else{
        res.json({Message:"User is not found"})
    }
}

//Update user if email changed or id or both 
const UpdateUser=(req,res,next)=>{
    const{name,id,Email}=req.body
    const Update = Users.find((user)=>{
        return user.Email==Email && (user.name!=name || user.id != id)
    })
    if(Update)
    {
        if (Update.name !== name) {
            Update.name = name; }
        if (Update.id !== id) {
            Update.id = id;}
        res.json({Message:"Updated successfully",Users})
    
}
    else
    {
        res.json({Message:" No change in User"})
    }

}

//export
module.exports = {
    GetAllUsers,
    Getallsorted,
    AddUser,
    DeleteUser,
    UpdateUser,
    SearchbyID,
    SearchbyIDquery,

}


