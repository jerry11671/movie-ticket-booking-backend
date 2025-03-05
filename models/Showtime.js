const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    seats: [{
        seatNumber: String,
        status: { type: String, enum: ['available', 'reserved', 'selected'], default: 'available' }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Showtime', showtimeSchema);