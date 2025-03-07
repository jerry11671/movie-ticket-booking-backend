const Movie = require("../models/Movie")
const User = require("../models/User")
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors")
const cloudinary = require("../helpers/cloudinary")



const getAllMovies = async (req, res) => {
    const { status } = req.query;
    const query = {}

    if (status) {
        query.status = status;
    }

    const movies = await Movie.find(query)

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Movie retrieved successfully", data: { movies } })
}


const getMovieById = async (req, res) => {
    const { id: movieId } = req.params;
    const movie = await Movie.findById(movieId)

    if (!movie) {
        throw new NotFoundError("Movie not found")
    }

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, data: { movie } })
}


const createMovie = async (req, res) => {
    const { title, description, genre, duration, releaseDate, status, poster, trailer } = req.body
    const { files } = req;

    const existingMovie = await Movie.findOne({ title: title })
    
    if (existingMovie) {
        throw new BadRequestError("Movie already exists.")
    }

    const posterUploadResult = await cloudinary.uploader.upload(files.poster[0].path, {
        resource_type: "image",
        folder: "movie_posters"
    });

    const trailerUploadResult = await cloudinary.uploader.upload(files.trailer[0].path, {
        resource_type: "video",
        folder: "movie_trailers"
    });

    const movie = new Movie({ title, description, genre, duration, releaseDate, status, posterUrl: posterUploadResult.url, trailerUrl: trailerUploadResult.url })
    await movie.save()

    return res.status(StatusCodes.CREATED).json({ success: true, status_code: 201, message: "Movie added successfully", data: { movie } })
}


const updateMovie = async (req, res) => {
    const { id: movieId } = req.params
    const updateData = req.body
    const movie = await Movie.findByIdAndUpdate({ _id: movieId }, updateData, { new: true })

    if (!movie) {
        throw NotFoundError("Movie not found")
    }

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Movie updated successfully", data: { movie } })
}


const deleteMovie = async (req, res) => {
    const { id: movieId } = req.params

    const movie = await Movie.findOne({ _id: movieId }).deleteOne()

    if (!movie) {
        throw NotFoundError("Movie not found")
    }

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Movie deleted successfully" })
}


module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };


