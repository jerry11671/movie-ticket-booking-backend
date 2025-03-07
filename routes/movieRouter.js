const express = require("express");
const router = express.Router()
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require("../controllers/movieController")
const authMiddleware = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

// Joi validator and schema
const validate = require("../middlewares/validate");
const { movieSchema, updateMovieSchema } = require("../validator/movieValidator")

// Cloudinary uploader 
const upload = require("../middlewares/upload")


router.get("/", getAllMovies);
router.get("/:id", authMiddleware, getMovieById);
router.post("/", adminAuth,  upload, createMovie) // Create movie
router.put("/:id", adminAuth, validate(updateMovieSchema), updateMovie) // Update movie
router.delete("/:id", adminAuth, deleteMovie) // Delete movie



module.exports = router;

