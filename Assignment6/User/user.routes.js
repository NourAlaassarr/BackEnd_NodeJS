import { Router } from "express"
const router = Router()
import * as UserController from './user.controller.js'

router.get('/Get',UserController.getall)//get all user 

router.get('/GetALL',UserController.join)//get user profile with user posts(using populate)

router.get('/ageBetween',UserController.ageBetween)//search for user where his age is between X and Y

router.post('/Signup',UserController.signup)//sign up ( email must be unique )
router.post('/Signin',UserController.signin)//signin

router.get('/Search',UserController.Search)//search for user where his name start with "X" and age less than Y=>   (X,Y => variables)
router.delete('/Delete/:_id',UserController.deleteUser)//update user

router.put('/Update/:_id',UserController.updateUser)//delete user


export default router