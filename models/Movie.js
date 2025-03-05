const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: [String] },
    duration: { type: Number }, // in minutes
    releaseDate: { type: Date },
    posterUrl: { type: String },
    trailerUrl: { type: String },
    status: { type: String, enum: ['Now Playing', 'Coming Soon', 'Top Movie'], required: true },
}, { timestamps: true });




module.exports = mongoose.model('Movie', movieSchema);
