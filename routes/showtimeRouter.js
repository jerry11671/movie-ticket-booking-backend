const express = require("express");
const router = express.Router()

const { getShowtimesForMovie, getShowtimeById, createShowtime, updateShowtime, deleteShowtime } = require("../controllers/showtimeController")
const authMiddleware = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

// Joi validator and schema
const validate = require("../middlewares/validate");
const { showtimeSchema, updateShowtimeSchema } = require("../validator/showtimeValidator");


router.get("/", authMiddleware, getShowtimesForMovie)  // This is a req query
router.get("/:id", authMiddleware, getShowtimeById)
router.post("/", adminAuth, validate(showtimeSchema), createShowtime) // Create showtime
router.put("/:id", validate(updateShowtimeSchema), adminAuth, updateShowtime) // Update showtime 
router.delete("/:id", adminAuth, deleteShowtime) // Delete showtime





module.exports = router;


