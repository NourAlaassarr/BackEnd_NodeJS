import { Router } from "express";
const router = Router()
import * as Usercontroller from './User.controller.js'


router.get('/GetALL', Usercontroller.Getallusers)  // Get All Users
router.get('/GetJoin', Usercontroller.GetAlljoins) // Get with join with product table
router.get('/Search',Usercontroller.Search)//Search with first letter
router.get('/SearchbyId',Usercontroller.SearchById)
router.put('/Update',Usercontroller.UpdateUser)//Update user
router.post('/Add', Usercontroller.AddUser)  // Add user
router.delete('/Delete',Usercontroller.deleteUser)//Delete user





export default router