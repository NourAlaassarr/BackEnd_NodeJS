//import
const{GetAllUsers,AddUser,DeleteUser,Getallsorted,UpdateUser, SearchbyID, SearchbyIDquery,} = require('./User.controllers')

const express =require('express')
const router = express.Router()

router.get('/GetAllUsers',GetAllUsers)
router.get('/GetAllSorted',Getallsorted)
router.delete('/Delete',DeleteUser)
router.post('/AddUser',AddUser)
router.put('/Update',UpdateUser)
router.get('/Search/:id',SearchbyID) // search by id with params
router.get('/SearchQ',SearchbyIDquery) // Search by id with query





module.exports=router