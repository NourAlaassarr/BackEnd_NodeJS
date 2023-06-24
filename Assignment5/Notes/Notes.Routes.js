import { Router } from "express";
const router = Router()
import * as NotesControllers from './Notes.Controllers.js'


router.post('/Add',NotesControllers.add)
router.get('/Get',NotesControllers.Get)
router.delete('/Delete',NotesControllers.Deleted)
router.put('/Update',NotesControllers.Update)
router.get('/GetJoin',NotesControllers.Getinclude)

router.get('/GetSpec',NotesControllers.GetSpecific)
export default router