import express from 'express'
const app = express()

import ProductRoutes from './Modules/Product/Product.routes.js'
import UserRoutes from './Modules/User/User.routes.js'
import DbConnection from './DB/Models/Controllers.js'


app.use(express.json())//parsing
DbConnection

app.use('/user',UserRoutes)
app.use('/product',ProductRoutes) 




app.listen(6000,()=>{
    console.log('....................Server running on port number 6000 ....................')
})