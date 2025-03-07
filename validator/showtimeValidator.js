const Joi = require('joi');

// Showtime Validation Schema
const showtimeSchema = Joi.object({
    movie: Joi.string().hex().length(24).required(),  // MongoDB ObjectId
    date: Joi.date().required(),
    time: Joi.string().required(),
    seats: Joi.array().items(
        Joi.object({
            seatNumber: Joi.string().required(),
            status: Joi.string().valid('available', 'reserved', 'selected').default('available')
        })
    ).optional()
});

const updateShowtimeSchema = Joi.object({
    movie: Joi.string(),
    date: Joi.date(),
    time: Joi.string(),
    seats: Joi.array().items(
        Joi.object({
            seatNumber: Joi.string(),
            status: Joi.string().valid('available', 'reserved', 'selected')
        })
    )
}).min(1);



module.exports = { showtimeSchema, updateShowtimeSchema };