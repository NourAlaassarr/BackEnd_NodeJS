//import
const {GetPosts,GetReversed,Add,Delete,Updated,searchbyid,searchPostbyidQ} = require('./Posts.controllers')

const express = require('express')
const router = express.Router()

router.get('/GetAllPosts',GetPosts)
router.get('/GetReverse',GetReversed)
router.post('/AddPost', Add)
router.delete('/DeletePosts', Delete)
router.put('/UpdatePost',Updated)
router.get('/SearchPost/:Id',searchbyid)
router.get('/searchPostbyidQ',searchbyid)




module.exports=router