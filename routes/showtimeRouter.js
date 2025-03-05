const express = require("express");
const router = express.Router()


router.get("/")  // This is a req query
router.get("/:id")
router.post("") // Create showtime
router.put("/:id") // Update showtime 
router.delete("/:id") // Delete showtime 


