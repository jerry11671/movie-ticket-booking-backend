const express = require('express');
const router = express.Router()

const { register, login } = require('../controllers/authController')
// const validate = require('../middlewares/validate');
// const userSchema = require('../validator/registerSchema');
// const loginSchema = require('../validator/loginSchema');


router.post('/register', register);
router.post('/login', login);




module.exports = router;