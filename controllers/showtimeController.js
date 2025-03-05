const Showtime = require("../models/showtime");
const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../errors")

// Get Showtimes for a specific movie
const getShowtimesForMovie = async (req, res) => {
    const { movieId } = req.query;
    const query = movieId ? { movie: movieId } : {};
    const showtimes = await Showtime.find(query).populate('movie');
    return res.status(StatusCodes.Ok).json({ success: true, status_code: 200, message: `Showtime for movie with id: ${movieId}`, data: showtimes });

};

// Get specific Showtime by ID
const getShowtimeById = async (req, res) => {
    const { id: showtimeId } = req.params;
    const showtime = await Showtime.findById(showtimeId).populate('movie');
    if (!showtime) {
        return NotFoundError("Showtime not found")
    }
    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Showtime retrieved successfully", data: showtime });
};

// Create Showtime (Admin only)
const createShowtime = async (req, res) => {
    const data = req.body
    const showtime = new Showtime(data);
    await showtime.save();
    return res.status(StatusCodes.CREATED).json({ success: true, status_code: 201, message: "Showtime created successfully", data: showtime });

};

// Update Showtime (Admin only)
const updateShowtime = async (req, res) => {
    const { id: showtimeId } = req.params;
    const showtime = await Showtime.findByIdAndUpdate(showtimeId, req.body, { new: true });
    if (!showtime) throw new NotFoundError("Showtime not found.");

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Showtime updated successfully", data: showtime });
};

// Delete Showtime (Admin only)
const deleteShowtime = async (req, res) => {
    const { id: showtimeId } = req.params;
    const showtime = await Showtime.findByIdAndDelete(showtimeId);

    if (!showtime) {
        throw new NotFoundError("Showtime not found.");
    }

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Showtime deleted successfully" });
};

module.exports = {
    getShowtimesForMovie,
    getShowtimeById,
    createShowtime,
    updateShowtime,
    deleteShowtime
};
