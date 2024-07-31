import express from "express"
import { createEvent, deleteEvent, updateEvent } from "../controllers/eventController.js"
import { upload } from "../storage.js" 
import { verifyToken } from "../middleware/authorization.js"

const router = express.Router()

router.post("/", verifyToken, upload.single('image'), createEvent)
router.put("/", verifyToken, upload.single('image'), updateEvent)
router.delete("/", verifyToken, deleteEvent)

export default router