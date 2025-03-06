const Joi = require('joi');

// Booking Validation Schema
const bookingSchema = Joi.object({
    showtimeId: Joi.string().hex().length(24).required(),  // MongoDB ObjectId
    seats: Joi.array().items(Joi.string().required()).min(1).required()
});


const updateBookingSchema = Joi.object({
    status: Joi.string().valid('confirmed', 'cancelled')
}).min(1); // For updating status (cancel booking)



module.exports = { bookingSchema, updateBookingSchema };