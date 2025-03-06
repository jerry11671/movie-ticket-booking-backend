const express = require("express");
const router = express.Router()

const { getShowtimesForMovie, getShowtimeById, createShowtime, updateShowtime, deleteShowtime } = require("../controllers/showtimeController")
const authMiddleware = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

// Joi validator and schema
const validate = require("../middlewares/validate");
const { movieSchema, updateMovieSchema } = require("../validator/movieValidator");


router.get("/", authMiddleware, getShowtimesForMovie)  // This is a req query
router.get("/:id", authMiddleware, getShowtimeById)
router.post("/", adminAuth, validate(movieSchema), createShowtime) // Create showtime
router.put("/:id", validate(updateMovieSchema), adminAuth, updateShowtime) // Update showtime 
router.delete("/:id", adminAuth, deleteShowtime) // Delete showtime





module.exports = router;


