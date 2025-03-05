const express = require("express");
const router = express.Router()
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require("../controllers/movieController")
const authMiddleware = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");


router.get("/", getAllMovies);
router.get("/:id", authMiddleware, getMovieById);
router.post("/", adminAuth, createMovie) // Create movie
router.put("/:id", adminAuth, updateMovie) // Update movie
router.delete("/:id", adminAuth, deleteMovie) // Delete movie



module.exports = router;

