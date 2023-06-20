import { Router } from "express";
const router = Router()
import * as ProductControllers from './Product.controllers.js'


router.post('/Add',ProductControllers.addProduct)
router.get('/GetAll',ProductControllers.GetALL)
router.get('/Search',ProductControllers.Search)
router.delete('/delete',ProductControllers.Delete)
router.put('/Update',ProductControllers.Update)













export default router