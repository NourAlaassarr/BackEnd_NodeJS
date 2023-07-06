import { Router } from "express";
const router =Router()
import * as PostControllers from './post.controller.js'

router.post('/Add',PostControllers.Add)//Add post
router.get('/Get',PostControllers.get)// get all posts
router.put('/Update/:_id',PostControllers.Updated)//update post (post owner only)
router.delete('/Delete/:_id',PostControllers.dele)//delete post (post creator only )
router.get('/sort',PostControllers.Getsort)// sort posts descending (By date)
router.get('/GetAll',PostControllers.GetAll)// get all posts with their owners informaion (using populate)

export default router