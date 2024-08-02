import express from "express"
import { createEvent, deleteEvent, updateEvent, getSingleEvent, getEventsByType } from "../controllers/eventController.js"
import { upload } from "../storage.js" 
import { verifyToken } from "../middleware/authorization.js"

const router = express.Router()

router.post("/", verifyToken, upload.single('image'), createEvent)
router.put("/:id", verifyToken, upload.single('image'), updateEvent)
router.delete("/:id", verifyToken, deleteEvent)
router.get("/:id", verifyToken, getSingleEvent)
router.get("/", verifyToken, getEventsByType)

export default router