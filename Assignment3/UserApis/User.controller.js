import DBconnection from '../../DB/Models/Controllers.js'

//Get All Users
const Getallusers = (req,res,next)=>{
DBconnection.execute(`Select * from users`,(err,result,fields)=>{
    if (err) {
        return res.json({
        message: 'Query Error',
        error: err,
        })
    }
    res.json({ message: 'Done', Users: result })
})
}

//Get with join with product table 
const GetAlljoins=(req,res,next)=>{
    DBconnection.execute(`select * from users inner join Products on users.id = Products.userid`,(err,result,fields)=>{
    
    
        if(err)
        {
            return res.json({Message:'Query Error', Error: err,})
        }
        return res.json({Message:'Done',Results: result,})
    })
    }

    //Search by name
const Search=(req,res,next)=>{
    const {letter,age} = req.query
    DBconnection.execute(`Select * from users where Age < '${age}' and  name LIKE '${letter}%'`,
    (err,result,field)=>{
    
if (err)
{
    return res.json({Message:'Query Error', Error: err})
}
return res.json({Message:'Done',Users: result})

    })

}

//add user
const AddUser = (req, res, next) => {
const {name,Email,password,age} = req.body

DBconnection.execute(`Select * from users where Email ='${Email}' `
,(err, result, fields) => {
    if (err) {
        return res.json({message: 'Query Error',
        error: err,})
}


if (result.length) {
    return res.json({
        message: 'Email is already exist',
    })
}

DBconnection.execute(
    `INSERT INTO users (name,Email,password,Age) VALUES ('${name}','${Email}','${password}', '${age}')`,
    (err, result, field) => {
        if (err) {
            return res.json({
                message: 'Query Error',
                error: err,})
            }
            if (result.affectedRows) {
            return res.json({
                message: 'Done',result,
            })
            }
            return res.json({
                message: 'Insertion Fail',
        })
        },
        )},
    )
}

//update user
const UpdateUser=(req,res,next)=>{
    const {name,Email,password,age}=req.body
DBconnection.execute(`SELECT name,Email, password,Id, Age FROM users WHERE Email = '${Email}' and ( name != '${name}' or password != '${password}')`,(err, result, fields) =>{
    if (err) {
        return res.json({message: 'Query Error',
        error: err,})
    }
    if (result.length) {
        DBconnection.execute(`UPDATE users SET name = '${name}',Email='${Email}',password='${password}',Age ='${age}' where Email = '${Email}' `,(err,result,field)=>{
    if (err) {
        return res.json({message: 'Query Error',
        error: err,})
    }
    if (result.affectedRows) {
        return res.json({
            message: 'Updated',result,
        })
        }
        return res.json({
            message: 'Insertion Fail',
    })
        
})
}
if (!result.length) {
    return res.json({
        message: 'User up to date',

})
}
})
}

//delete
const deleteUser =(req,res,next)=>{
const {Email} = req.body
DBconnection.execute(`Select Email from users where Email = '${Email}'`,(err,result,field)=>{

if(err)
{
    return res.json({Message:'Query Error',Error:err})
}
if(result.length)
{
    DBconnection.execute(`Delete from users where Email = '${Email}'`,(err,result,field)=>{
        if(err)
        {
            res.json({Message:'Query Error',error: err})
        }
        if (result.affectedRows) {
            return res.json({
                message: 'Deleted',result,
            })
            }
            return res.json({
                message: 'Failed',
        })
    })
}
if(!result.length)
{
    return res.json({Message:'User is not found'})
}
})
}

//Seach by ID in list
const SearchById=(req,res,next)=>{
const {arr} =req.body
DBconnection.execute(`SELECT * FROM USERS WHERE id IN (${arr.join(",")})`,(err,result,field)=>{
    if (err) {
        res.json({ message: 'QUERY ERROR', Error:err });
    }
    return res.json({ message: "done", result});

})
}

export
{
    Getallusers,
    AddUser,
    SearchById,
    GetAlljoins,
    Search,
    UpdateUser,
    deleteUser
}