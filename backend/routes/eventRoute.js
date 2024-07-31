import express from "express"
import { createEvent } from "../controllers/eventController.js"
import { upload } from "../storage.js" 
import { verifyToken } from "../middleware/authorization.js"

const router = express.Router()

router.post("/", verifyToken, upload.single('image'), createEvent)

export default router