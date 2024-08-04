import express from "express"
import { verifyToken } from "../middleware/authorization.js"
import { createBooking, deleteBooking, getUserBookings } from "../controllers/bookingController.js"

const router = express.Router()

router.post("/", verifyToken, createBooking)
router.delete("/:id", verifyToken, deleteBooking)
router.get("/:bookingsStatus", verifyToken, getUserBookings)

export default router