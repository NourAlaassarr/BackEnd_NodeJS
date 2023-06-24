import express from 'express'
const app =express()
import { DBconnection } from './DB/Connection.js'
import userroutes from './modules/User/User.routes.js'
import notesroutes from './modules/Notes/Notes.Routes.js'


app.use(express.json())
DBconnection()
app.use('/user',userroutes)
app.use('/notes',notesroutes)



app.listen(6000,()=>{
    console.log('...............Server is Running on port number 6000.....................')
})