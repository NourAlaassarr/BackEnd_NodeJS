import express from 'express'
import { DBConnection } from './DB/Connection.js'
import * as allroutes from './src/index.routes.js'
import { config } from 'dotenv'
config()
const app = express()
const port = process.env.port

app.use(express.json())
DBConnection()

app.use('/user', allroutes.UserRoutes)
app.use('/task',allroutes.TaskRoutes)
app.use('*',(req,res,next)=>{  // or use.all
    res.json({Message:'404 Not found'})
})
app.listen(port, () => {
    console.log(`Server running on port Number ${port}!`)
})
