import DbConnection from "../../DB/Models/Controllers.js"

//ADD Product
const addProduct=(req,res,next)=>{
const{pname,pDescription,createdby,price,userid}=req.body

DbConnection.execute(`Select * From products where pname = '${pname}'`
,(err,result,field)=>{
if(err){
    return res.json({Message:"Query Error",Error:err})
}
if(result.length)
{
    return res.json({Message:'Product already exsit'})
}
DbConnection.execute(`INSERT INTO products (userid, pname, pDescription, createdby, price) VALUES ('${userid}','${pname}','${pDescription}','${createdby}','${price}')`,
(err,result,field)=>{
if(err)
{
    return res.json({Message:'Query error',Error:err})
}
if(result.affectedRows)
{
    return res.json({Message:'Added', result})
}
return res.json({Message:'Failed'})

})
})
}

//Get All products
const GetALL = (req,res,next)=>{
    DbConnection.execute(`Select * from products`,(err,result,field)=>{
        if(err)
        {
            return res.json({Message:'Query Error',Error:err})
        }
        if(result.length)
        {
            return res.json({Message:'Products',Results:result})
        }

    })
}

//Search
const Search=(req,res,next)=>{
    DbConnection.execute(`Select * from products where price > 3000`,(err,result,field)=>{
        if(err)
        {
            return res.json({Message:'Error',Error:err})
        }
        if(result.length)
        {
            return res.json({Message:'Done',result})
        }
        return res.json({Message:'all prices are smaller than 3000'})
    })
}

//delete product (product owner only can do this and product must be found )
const Delete = (req,res,next)=>{
const{pname,createdby}=req.body
DbConnection.execute(`select * from products where pname='${pname}'and createdby ='${createdby}'`,
(err,result,field)=>{
    if(err){
        return res.json({message:'query error'})
    }
    if(result.length){
        DbConnection.execute(`delete from products where pname='${pname}'`,(err,result,field)=>{
            if(err){
                return res.json({message:'Query error'})
            }
            if(result.affectedRows)
            {
                return res.json({message:'deleted',result})}
            return res.json({message:'failed'})


        })
    }
    if(!result.length){
    DbConnection.execute(`Select pname from products where pname='${pname}'`,(err,result,field)=>{
        if(err){
            return res.json({message:'Query error'})
        }
        
        if(result.length)
        {
            res.json({message:'Not the owner cannot be deleted'})
        }
        else
        res.json({Message:'Product is not found'})
    


    })

}
})
}

//update product (product owner only)
const Update =(req,res,next)=>{
    const {pname,createdby,pDescription,price}=req.body
    DbConnection.execute(`SELECT * FROM products WHERE pname='${pname}' and createdby = '${createdby}' and ( pDescription != '${pDescription}' or price != '${price}')`,
    (err,result,field)=>{
        if(err)
        {
            return res.json ({Message:"Query Error",Error:err})
        }
        if(result.length)
        {
            DbConnection.execute(`UPDATE products SET pname ='${pname}', pDescription ='${pDescription}',createdby='${createdby}',price='${price}' WHERE pname = '${pname}'`,(err,result,field)=>{
                if(err)
                {
                    return res.json({message:'Query error',Error:err})
                }
                if(result.affectedRows)
                {
                    return res.json({Message:'Updated',result})
                }
                return res.json({Message:'Failed'})

            })
        }
        if(!result.length)
        {
            return res.json({Message:'Product up to date'})
        }



    })
}



export {
    addProduct,
    GetALL,
    Search,
    Delete,
    Update,




}