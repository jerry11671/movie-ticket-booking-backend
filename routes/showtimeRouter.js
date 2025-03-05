const express = require("express");
const router = express.Router()

const { getShowtimesForMovie, getShowtimeById, createShowtime, updateShowtime, deleteShowtime } = require("../controllers/showtimeController")
const authMiddleware = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");


router.get("/", authMiddleware, getShowtimesForMovie)  // This is a req query
router.get("/:id", authMiddleware, getShowtimeById)
router.post("/", adminAuth, createShowtime) // Create showtime
router.put("/:id", adminAuth, updateShowtime) // Update showtime 
router.delete("/:id", adminAuth, deleteShowtime) // Delete showtime





module.exports = router;


