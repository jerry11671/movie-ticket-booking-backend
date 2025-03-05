const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");


const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        throw new BadRequestError("Please provide all fields");
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new BadRequestError("User with this email already exists");
    }

    const user = new User({ name, email, password });
    await user.save()
    user.password = undefined;
    const token = user.createJWT();

    // Email send funcionality

    res.status(StatusCodes.CREATED).json({ success: true, status_code: 201, message: 'Registration successful', data: { user, token: token } });
}


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password to login");
    }

    const user = await User.findOne({ email: email }).select("-password");

    if (!user) {
        throw new NotFoundError("User account does not exist");
    }

    const isPasswordCorrect = await user.comparePasswords(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid password");
    }

    const token = user.createJWT();

    return res.status(StatusCodes.OK).json({
        success: true, status_code: 200, message: 'Login successful', data: { user, token: token }
    });
}






module.exports = { register, login };