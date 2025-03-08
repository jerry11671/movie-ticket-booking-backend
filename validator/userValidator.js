const Joi = require('joi');

// User Validation Schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().optional().default(false),
    role: Joi.string().valid("admin", "viewer")
});

const updateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).min(1);



module.exports = { userSchema, updateUserSchema };