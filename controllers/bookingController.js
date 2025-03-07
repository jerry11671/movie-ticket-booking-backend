const Booking = require('../models/Booking');
const Showtime = require("../models/Showtime");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors")


const getSeatsForShowtime = async (req, res) => {
    const { id: showtimeId } = req.params;
    const showtime = await Showtime.find({ _id: showtimeId })

    if (!showtime) {
        throw new NotFoundError("Showtime does not exist.")
    }

    return res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: "Seats retrieved successfully", data: { seats: showtime[0].seats } })
}

// Create Booking
const createBooking = async (req, res) => {
    const { showtimeId, seatNumbers } = req.body;
    const showtime = await Showtime.findById(showtimeId);

    if (!showtime) {
        throw new NotFoundError("Showtime not found.");
    }

    // Check seat availabiity
    const requestedSeats = showtime.seats.filter(seat =>
        seatNumbers.includes(seat.seatNumber)
    )


    // Verify all requested seats exist
    if (requestedSeats.length !== seatNumbers.length) {
        throw new BadRequestError("Some requested seats don't exist");
    }


    // Check if any requested seat is already reserved
    const unavailableSeats = requestedSeats.filter(seat =>
        seat.status === "reserved"
    );

    if (unavailableSeats.length > 0) {
        const unavailableSeatNumbers = unavailableSeats.map(seat => seat.seatNumber);
        throw new BadRequestError(`Seats ${unavailableSeatNumbers.join(', ')} is already reserved`);
    }

    const seatPrices = 1500;  // Assume each seat costs 1500
    const totalPrice = seatNumbers.length * seatPrices;

    // Update seat statuses
    showtime.seats = showtime.seats.map(seat => {
        if (seatNumbers.includes(seat.seatNumber)) {
            return { ...seat, status: 'reserved' };
        }
        return seat;
    });

    await showtime.save();

    const booking = new Booking({
        user: req.user.id,
        movie: showtime.movie,
        showtime: showtime._id,
        seats: seatNumbers,
        totalPrice,
    });

    await booking.save();
    res.status(StatusCodes.CREATED).json({ success: true, status_code: 201, message: "Booking succesful", data: { booking } });
};

// Get User Bookings
const getUserBookings = async (req, res) => {
    const { id: userId } = req.user
    const bookings = await Booking.find({ user: userId }).populate('movie showtime');
    res.status(StatusCodes.OK).json({ success: true, status_code: 200, message: bookings.length > 0 ? "Bookings retrieved sucessfully" : "No Booking for this user", data: { bookings } });
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

module.exports = { getSeatsForShowtime, createBooking, getUserBookings, cancelBooking };
