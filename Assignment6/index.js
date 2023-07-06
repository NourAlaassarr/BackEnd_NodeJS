import express from "express";
const App = express()
import {DBConnection} from './DB/Connections.js'

import UserRoutes from './Modules/User/user.routes.js'
import PostRoutes from './Modules/Post/post.routes.js'


DBConnection()
App.use(express.json())
App.use('/user',UserRoutes)
App.use('/post',PostRoutes)



.listen(5000,()=>{
    console.log('.................Server Running on port number 5000..................')
})