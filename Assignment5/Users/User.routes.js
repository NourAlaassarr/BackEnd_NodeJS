import { Router } from "express";
import * as UserControllers from './User.Controllers.js'
const router = Router()


router.post('/Signup',UserControllers.signup)//signup
router.get('/GetAll',UserControllers.GetUsers)//Get all users
router.get('/signin',UserControllers.Signin)//signin

router.get('/SearchIn',UserControllers.SearchIn)//search for users by list of ids => using IN

router.get('/SearchOldest',UserControllers.SearchOldest)//get the 3 oldest users(اكبر ٣ مستخدمين فى العمر)


router.get('/Search',UserControllers.Search)// search for user where his name start with "a" and age less than 30 => using like for characters
router.get('/SearchParam',UserControllers.SearchParam) // search for user where his name start with "a" and age less than 30 => using like for characters But with parameters

router.get('/SearchBetween',UserControllers.SearchBetween)//search for user where his age is between 20 and 30 

router.put('/Update',UserControllers.update)//update
router.delete('/Delete',UserControllers.Deleted)//delete








export default router