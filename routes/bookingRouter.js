const express = require("express");
const router = express.Router()
const { createBooking, getUserBookings, cancelBooking } = require("../controllers/bookingController")
const authMiddleware = require("../middlewares/auth");


router.post("/", authMiddleware, createBooking) // Create booking
router.get("/", authMiddleware, getUserBookings)  // Get Bookings for logged in user 
router.put("/:id/cancel", authMiddleware, cancelBooking) // Cancel Booking




module.exports = router;

