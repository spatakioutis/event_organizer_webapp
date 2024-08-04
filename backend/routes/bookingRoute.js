import express from "express"
import { verifyToken } from "../middleware/authorization.js"
import { createBooking, deleteBooking } from "../controllers/bookingsController.js"

const router = express.Router()

router.post("/", verifyToken, createBooking)
router.delete("/:id", verifyToken, deleteBooking)

export default router