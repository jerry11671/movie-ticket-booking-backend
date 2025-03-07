const Joi = require('joi');

// Movie Validation Schema
const movieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    releaseDate: Joi.date().required(),
    genre: Joi.array().items(Joi.string().required()).required(),
    duration: Joi.number().positive().required(),
    status: Joi.string().valid('Now Playing', 'Coming Soon', 'Archived').default('Coming Soon'),
    poster: Joi.string().uri().optional()
});


const updateMovieSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    releaseDate: Joi.date(),
    status: Joi.string().valid('Now Playing', 'Coming Soon', 'Archived')
}).min(1);



module.exports = { movieSchema, updateMovieSchema };