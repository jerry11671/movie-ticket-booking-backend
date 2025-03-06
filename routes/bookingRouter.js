const express = require("express");
const router = express.Router()
const { createBooking, getUserBookings, cancelBooking } = require("../controllers/bookingController")
const authMiddleware = require("../middlewares/auth");

// Joi validator and Schema
const validate = require('../middlewares/validate');
const { bookingSchema } = require('../validator/userValidator');


router.post("/", authMiddleware, validate(bookingSchema), createBooking) // Create booking
router.get("/", authMiddleware, getUserBookings)  // Get Bookings for logged in user 
router.put("/:id/cancel", authMiddleware, cancelBooking) // Cancel Booking




module.exports = router;

