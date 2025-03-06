const Joi = require('joi');

// User Validation Schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    isAdmin: Joi.boolean().optional().default(false)
});

const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
}).min(1);



module.exports = { userSchema, updateUserSchema };