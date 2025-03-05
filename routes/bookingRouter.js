const express = require("express");
const router = express.Router()


router.post("/") // Create booking
router.get("/")  // Get Bookings for logged in user 
router.post("") // Create movie
router.put("/:id/cancel") // Cancel movie

