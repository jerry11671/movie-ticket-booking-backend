const express = require('express');
const router = express.Router()

const { register, login } = require('../controllers/authController')

// Joi validator and schema
const validate = require('../middlewares/validate');
const { userSchema, updateUserSchema } = require('../validator/userValidator');


router.post('/register', validate(userSchema), register);
router.post('/login', validate(updateUserSchema), login);




module.exports = router;