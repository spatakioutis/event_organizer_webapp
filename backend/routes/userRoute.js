import express from "express"
import { changePassword, changeUserInfo, deleteUser } from '../controllers/userController.js'
import { upload } from "../storage.js" 
import { verifyToken } from "../middleware/authorization.js"

const router = express.Router()

router.put('/info', verifyToken, changeUserInfo)
router.put('/password', verifyToken, changePassword)
router.delete('/', verifyToken, deleteUser)

export default router