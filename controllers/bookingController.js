const Booking = require('../models/Booking');
const Showtime = require("../models/Showtime");
const { StatusCodes } = require("http-status-codes");

// Create Booking
const createBooking = async (req, res) => {
    const { showtimeId, seats } = req.body;
    const showtime = await Showtime.findById(showtimeId);

    if (!showtime) {
        throw new NotFoundError("Showtime not found.");
    }

    const seatPrices = 1500;  // Assume each seat costs 1500
    const totalPrice = seats.length * seatPrices;

    // Update seat statuses
    showtime.seats = showtime.seats.map(seat => {
        if (seats.includes(seat.seatNumber)) {
            return { ...seat, status: 'reserved' };
        }
        return seat;
    });

    await showtime.save();

    const booking = new Booking({
        user: req.user.id,
        movie: showtime.movie,
        showtime: showtime._id,
        seats,
        totalPrice,
    });

    await booking.save();
    res.status(StatusCodes.CREATED).json({ success: true, status_code: 201, message: "Booking succesful", data: { booking } });
};

// Get User Bookings
const getUserBookings = async (req, res) => {
    const { id: userId } = req.user
    const bookings = await Booking.find({ user: userId }).populate('movie showtime');
    res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Bookings retreived sucessfully", data: { bookings } });
};

// Cancel Booking
const cancelBooking = async (req, res) => {
    const { id: bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
        throw new NotFoundError("Booking not found.")
    }

    if (booking.user.toString() !== req.user.id.toString()) {
        throw new UnauthenticatedError("Not authorized")
    }

    booking.status = 'cancelled';
    await booking.save();

    // Free up seats in the showtime
    const showtime = await Showtime.findById(booking.showtime);
    showtime.seats = showtime.seats.map(seat => {
        if (booking.seats.includes(seat.seatNumber)) {
            return { ...seat, status: 'available' };
        }
        return seat;
    });

    await showtime.save();
    res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: 'Booking cancelled' });
};

module.exports = { createBooking, getUserBookings, cancelBooking };
