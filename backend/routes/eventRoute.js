import express from "express"
import { createEvent, deleteEvent, updateEvent, getSingleEvent, getEventsByType, getEventsByNewest } from "../controllers/eventController.js"
import { upload } from "../storage.js" 
import { verifyToken } from "../middleware/authorization.js"

const router = express.Router()

router.use(verifyToken)

router.post("/", upload.single('image'), createEvent)
router.put("/:id", upload.single('image'), updateEvent)
router.delete("/:id", deleteEvent)
router.get("/:id", getSingleEvent)
router.get("/type", getEventsByType)
router.get("/newest", getEventsByNewest)

export default router